"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";

import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { UploadButton } from "../uploadthing";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Eye, Loader2, Pencil, PencilLine, Plus, Terminal, Trash, XCircle } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import useLocation from "@/hooks/useLocation";
import { Country, ICity, IState } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddRoomForm from "../room/AddRoomForm";
import RoomCard from "../room/RoomCard";
import { Separator } from "../ui/separator";



interface AddHotelFormprops{
    hotel?: HotelWithRooms | null 
}

export type HotelWithRooms = Hotel & {
    rooms: Room []
}

const formSchema = z.object({            
  title: z.string().min(3,{
    message: "Title must be atleast 3 characters long"
  }),
  description: z.string().min(10,{
    message: "Description must be atleast 10 characters long"
  }),
  image: z.string().min(1,{
    message: "Image is required"
  }),
  country: z.string().min(1,{
    message: "Country is required"
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10,{
    message: "Description must be atleast 10 characters long"
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),

})

const AddHotelForm = ({hotel}: AddHotelFormprops) => {

    const [image, setImage] = useState<string | undefined>(hotel?.image)
    const [imageIsDeleting, setImageIsDeleting] = useState(false)
    const [states, setState] = useState<IState[]>([])
    const [cities, setCities] = useState<ICity[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const {toast} = useToast()
    const router = useRouter()
    const {getAllCountries, getCountryStates, getStateCities} = useLocation()
    const countries = getAllCountries()



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: hotel ||  {
            title:"",
            description:"",
            image:"",
            country:"",
            state:"",
            city:"",
            locationDescription:"",
            gym: false, 
            spa: false,
            bar: false,
            laundry: false,
            restaurant: false, 
            shopping: false,
            freeParking: false,
            bikeRental: false,
            freeWifi: false,
            movieNights: false,
            swimmingPool: false,
            coffeeShop: false,
            
        },
      })

      useEffect(()=>{
        if(typeof image === "string"){
          form.setValue("image", image , {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
          })
        }
      }, [image])

      useEffect(() =>{
        const selectedCountry = form.watch("country")
        const countryStates = getCountryStates(selectedCountry)
        if(countryStates){
          setState(countryStates)
        }
      }, [form.watch("country")])



      useEffect(() =>{
        const selectedCountry = form.watch("country")
        const selectedState = form.watch("state")
        const stateCities = getStateCities(selectedCountry, selectedState)
        if(stateCities){
          setCities(stateCities)
        }
      }, [form.watch("country"), form.watch("state")])



      function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        if(hotel){
          axios.patch("/api/hotel/${hotel.id}", values).then((res) =>{
            toast({
              variant: "success",
              description: "Hotel Updated!"
            })
            router.push(`/hotel/${res.data.id}`)
              setIsLoading(false)
          }).catch((err) =>{
            console.log(err)
            toast({
              variant: "desctructive",
              description: "Something went wrong!"
            })
            setIsLoading(false)
          })
        }else{
          axios.post("/api/hotel", values).then((res) =>{
              toast({
                variant: "success",
                description: "Hotel created!"
              })
              router.push(`/hotel/${res.data.id}`)
              setIsLoading(false)
          }).catch((err) =>{
            console.log(err)
            toast({
              variant: "desctructive",
              description: "Something went wrong!"
            })
            setIsLoading(false)
          })
        }
      }

      const handleImageDelete = (image: string) =>{
        setImageIsDeleting(true)
        const imageKey = image.substring(image.lastIndexOf("/") + 1)

        axios.post("/app/api/uploadthing/delete", {imageKey}).then((res) =>{
          if(res.data.success){
            setImage("");
            toast({
              variant: "success",
              description: "Image removed"
            })
          }
        }).catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong"
          })
        }).finally(() =>{
          setImageIsDeleting(false)
        })

      }

      const handleDialogueOpen = () =>{
        setOpen(prev => !prev)
      }

      const handleDeleteHotel = async (hotel: HotelWithRooms) =>{
          setIsHotelDeleting(true)
          const getImageKey = (src: string) => src.substring(src.lastIndexOf("/") + 1)
          try {
            const imageKey = getImageKey(hotel.image)
              await axios.post("/api/uploadthing/delete", {imageKey})
              await axios.delete(`/api/hotel/${hotel.id}`)

              setIsHotelDeleting(false)
              toast({
                variant: "success",
                description: "Hotel Delete!"
              })
              router.push("/hotel/new")
          } catch (error: any) {
            console.log(error)
            setIsHotelDeletig(false)
            toast({
              variant: "destructive",
              description: `Hotel deletion could not be completed! ${error.message}`
            })
          }
      }


    return ( <div>
       <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-lg font-semibold">{hotel ? "update your hotel!" : "Describa your hotel!"}</h3>
                <div className="flex flex-col md:flex-rowgap-6">
                    <div className="flex-1 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hotel Title *</FormLabel>
                                        <FormDescription>
                                            Provide your hotel name
                                        </FormDescription>
                                        <FormControl>
                                            <Input placeholder="Beach Hotel" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hotel Description *</FormLabel>
                                        <FormDescription>
                                            Provide a detailed description of your hotel
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea placeholder="Beach Hotel is parked with many awesme amenitie!" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                          <div>
                            <FormLabel>Choose Amenities</FormLabel>
                            <FormDescription>Choose Amenities popular in your hotel</FormDescription>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <FormField
                                control={form.control}
                                  name="gym"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Gym</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="spa"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Spa</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="bar"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Bar</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="laundry"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Laundry Facilities</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="restaurant"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Restaurant</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="shopping"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Shopping</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="freeParking"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Free Parking</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="bikeRental"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Bike Rental</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="movieNights"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Movie Nights</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="swimmingPool"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Swimming Pool</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="coffeeshop"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Coffee Shop</FormLabel>
                                      </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <FormField
                          control={form.control}
                          name="image"
                          render={({field}) =>(
                            <FormItem className="flex flex-col space-y-3">
                              <FormLabel>Upload an Image *</FormLabel>
                              <FormDescription>Choose an image that will chow-case your hotel nicely</FormDescription>
                              <FormControl>
                                {image ? <>
                                <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                                  <Image fill src={image} alt="Hotel Image" className="object-contain"/>
                                  <Button onClick={() => handleImageDelete(image)} type="button" size="icon" variant="ghost" className="absolute right-[-12px] top-0">
                                    {imageIsDeleting ? <Loader2/> : <XCircle/>}
                                  </Button>
                                </div>
                                </> : <>
                                <div className="flex flex-col items-center max-w[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                                  <UploadButton
                                      endpoint="imageUploader"
                                      onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        console.log("Files: ", res);
                                        setImage(res[0].url)
                                        toast({
                                          variant: "success",
                                          description: "upload Completed"
                                        })
                                      }}
                                      onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        
                                        alert(`ERROR! ${error.message}`);
                                        toast({
                                          variant: "destructive",
                                          description: "ERROR! ${error.message}"
                                        })
                                      }}
                                  />
                                </div>
                                </>}
                              </FormControl>
                            </FormItem>
                          )}
                          />
                    </div>
                    <div className="flex- flex flex-col gap-">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                        control={form.control}
                        name="country"
                        render={({field}) =>(
                          <FormItem>
                            <FormLabel>Select Country *</FormLabel>
                            <FormDescription>In which country is your property located?</FormDescription>
                              <Select
                              disabled = {isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              >
                                  <SelectTrigger className="bg-background">
                                      <SelectValue defaultValue={field.value} placeholder="Select a County" />
                                  </SelectTrigger>
                                    <SelectContent>
                                      {countries.map((Country) =>{
                                        return <SelectItem key={Country.isoCode} value={Country.isoCode}>{Country.name}</SelectItem>
                                      })}
                                  </SelectContent>
                              </Select>

                          </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="country"
                        render={({field}) =>(
                          <FormItem>
                            <FormLabel>Select Country *</FormLabel>
                            <FormDescription>In which country is your property located?</FormDescription>
                              <Select
                              disabled = {isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              >
                                  <SelectTrigger className="bg-background">
                                      <SelectValue defaultValue={field.value} placeholder="Select a County" />
                                  </SelectTrigger>
                                    <SelectContent>
                                      {countries.map((Country) =>{
                                        return <SelectItem key={Country.isoCode} value={Country.isoCode}>{Country.name}</SelectItem>
                                      })}
                                  </SelectContent>
                              </Select>

                          </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="country"
                        render={({field}) =>(
                          <FormItem>
                            <FormLabel>Select Country *</FormLabel>
                            <FormDescription>In which country is your property located?</FormDescription>
                              <Select
                              disabled = {isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              >
                                  <SelectTrigger className="bg-background">
                                      <SelectValue defaultValue={field.value} placeholder="Select a County" />
                                  </SelectTrigger>
                                    <SelectContent>
                                      {countries.map((Country) =>{
                                        return <SelectItem key={Country.isoCode} value={Country.isoCode}>{Country.name}</SelectItem>
                                      })}
                                  </SelectContent>
                              </Select>

                          </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="state"
                        render={({field}) =>(
                          <FormItem>
                            <FormLabel>Select State</FormLabel>
                            <FormDescription>In which state is your property located?</FormDescription>
                              <Select
                              disabled = {isLoading || states.length < 1}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              >
                                  <SelectTrigger className="bg-background">
                                      <SelectValue defaultValue={field.value} placeholder="Select a State" />
                                  </SelectTrigger>
                                    <SelectContent>
                                      {states.map((state) =>{
                                        return <SelectItem key={state.isoCode} value={state.isoCode}>{state.name}</SelectItem>
                                      })}
                                  </SelectContent>
                              </Select>

                          </FormItem>
                        )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({field}) =>(
                          <FormItem>
                            <FormLabel>Select City</FormLabel>
                            <FormDescription>In which town/city is your property located?</FormDescription>
                              <Select
                              disabled = {isLoading || cities.length < 1}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              >
                                  <SelectTrigger className="bg-background">
                                      <SelectValue defaultValue={field.value} placeholder="Select a City" />
                                  </SelectTrigger>
                                    <SelectContent>
                                      {cities.map((city) =>{
                                        return <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                                      })}
                                  </SelectContent>
                              </Select>

                          </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="locationDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location Description *</FormLabel>
                                        <FormDescription>
                                            Provide a detailed location description of your hotel
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea placeholder="Located at the very end of the beach road!" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {hotel && !hotel.rooms.length && 
                          <Alert className="bg-indigo-600 text-white">
                            <Terminal className="h-4 w-4" stroke-white />
                            <AlertTitle>One last step!</AlertTitle>
                            <AlertDescription>
                              Your hotel was created successfuly
                              <div>Please add some rooms to complete your hotel setup!</div>
                            </AlertDescription>
                          </Alert>}

                        <div className="flex justify-between gap-2 flex-wrap">
                          {hotel && <Button onClick={() => handleDeleteHotel(hotel)} variant="ghost" type="button" className="max-w-[150px]" disabled={isHotelDeleting || isLoading}>
                            {isHotelDeleting ? <><Loader2 className="mr-2 h-4 w-4"/>Deleting</> : <><Trash className="mr-2 h-4 w-4"/>Delete</>}
                            </Button>}
                            
                            {hotel && <Button onClick={() => router.push(`/hotel-details/${hotel.id}`)}
                            variant="outline" type="button"><Eye className="mr-2 h-4 w-4"/> View</Button>}

                            {hotel && 
                              <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                  <Button type="button" variant="outline" className="max-w-[150px]">
                                   <Plus className= "mr-2 h-4 w-4"/> Add Room 
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[900px] w-90%">
                                  <DialogHeader className="px-2">
                                    <DialogTitle>Add a Room</DialogTitle>
                                    <DialogDescription>
                                      Add details about a room in your hotel.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <AddRoomForm hotel={hotel} handleDialogueOpen={handleDialogueOpen}/>
                                </DialogContent>
                              </Dialog>
                            }

                            


                            {hotel ? <Button className="max-w-[150px]" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4"/> Updating </> : <><PencilLine
                             className="mr-2 h-4 w-4"/>update </>}</Button> : <Button
                             className="max-w-[150px]" disabled={isLoading}>
                             {isLoading ? <><Loader2 className= "mr-2 h-4 w-4" />Creating</> : <><Pencil className="mr-2 h-4 w-4"/> Create Hotel</>}
                             </Button>}
                        </div>
                        {hotel && !!hotel.rooms.length && <div>
                          <Separator/>
                          <h3 className="text-lg font-semibold my-4">Hotel Rooms</h3>
                          <div className="grid grid-cols-1 2x1:grid-cols-2 gap-6">
                            {hotel.rooms.map(room =>{
                              return <RoomCard key={room.id} hotel={hotel} room={room}/>
                            })}
                          </div>
                        </div>}
                    </div>
                </div>
                
            </form>
       </Form>
    </div> );
}
 
export default AddHotelForm;














// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Hotel, Room } from "@prisma/client";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import { useForm } from "react-hook-form";
// import { Textarea } from "../ui/textarea";
// import { Checkbox } from "@radix-ui/react-checkbox";
// import { useEffect, useState } from "react";
// import { UploadButton } from "../uploadthing";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "../ui/button";
// import { Loader2 } from "lucide-react";
// import axios from "axios";
// import useLocation from "@/hooks/useLocation";
// import { ICity, IState } from "country-state-city";
// import Image from "next/image"; // Återinförd import

// interface AddHotelFormProps {
//   hotel?: HotelWithRooms | null;
// }

// export type HotelWithRooms = Hotel & {
//   rooms: Room[];
// };

// const formSchema = z.object({
//   title: z.string().min(3, {
//     message: "Title must be at least 3 characters long",
//   }),
//   description: z.string().min(10, {
//     message: "Description must be at least 10 characters long",
//   }),
//   image: z.string().min(1, {
//     message: "Image is required",
//   }),
//   country: z.string().min(1, {
//     message: "Country is required",
//   }),
//   state: z.string().optional(),
//   city: z.string().optional(),
//   locationDescription: z.string().min(10, {
//     message: "Description must be at least 10 characters long",
//   }),
//   gym: z.boolean().optional(),
//   spa: z.boolean().optional(),
//   bar: z.boolean().optional(),
//   laundry: z.boolean().optional(),
//   restaurant: z.boolean().optional(),
//   shopping: z.boolean().optional(),
//   freeParking: z.boolean().optional(),
//   bikeRental: z.boolean().optional(),
//   freeWifi: z.boolean().optional(),
//   movieNights: z.boolean().optional(),
//   swimmingPool: z.boolean().optional(),
//   coffeeShop: z.boolean().optional(),
// });

// const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
//   const [image, setImage] = useState<string | undefined>(hotel?.image);
//   const [imageIsDeleting, setImageIsDeleting] = useState(false);
//   const [states, setStates] = useState<IState[]>([]);
//   const [cities, setCities] = useState<ICity[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const { toast } = useToast();
//   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
//   const countries = getAllCountries();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       image: "",
//       country: "",
//       state: "",
//       city: "",
//       locationDescription: "",
//       gym: false,
//       spa: false,
//       bar: false,
//       laundry: false,
//       restaurant: false,
//       shopping: false,
//       freeParking: false,
//       bikeRental: false,
//       freeWifi: false,
//       movieNights: false,
//       swimmingPool: false,
//       coffeeShop: false,
//     },
//   });

//   useEffect(() => {
//     const selectedCountry = form.watch("country");
//     const countryStates = getCountryStates(selectedCountry);
//     if (countryStates) {
//       setStates(countryStates);
//     }
//   }, [form.watch("country")]);

//   useEffect(() => {
//     const selectedCountry = form.watch("country");
//     const selectedState = form.watch("state");
//     const stateCities = getStateCities(selectedCountry, selectedState);
//     if (stateCities) {
//       setCities(stateCities);
//     }
//   }, [form.watch("country"), form.watch("state")]);

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }

//   const handleImageDelete = (image: string) => {
//     setImageIsDeleting(true);
//     const imageKey = image.substring(image.lastIndexOf("/") + 1);

//     axios
//       .post("/app/api/uploadthing/delete", { imageKey })
//       .then((res) => {
//         if (res.data.success) {
//           setImage("");
//           toast({
//             variant: "success",
//             description: "Image removed",
//           });
//         }
//       })
//       .catch(() => {
//         toast({
//           variant: "destructive",
//           description: "Something went wrong",
//         });
//       })
//       .finally(() => {
//         setImageIsDeleting(false);
//       });
//   };

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <h3 className="text-lg font-semibold">
//             {hotel ? "Update your hotel!" : "Describe your hotel!"}
//           </h3>
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="flex-1 flex flex-col gap-6">
//               <FormField
//                 control={form.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Hotel Title *</FormLabel>
//                     <FormDescription>
//                       Provide your hotel name
//                     </FormDescription>
//                     <FormControl>
//                       <Input placeholder="Beach Hotel" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Hotel Description *</FormLabel>
//                     <FormDescription>
//                       Provide a detailed description of your hotel
//                     </FormDescription>
//                     <FormControl>
//                       <Textarea placeholder="Beach Hotel is packed with many awesome amenities!" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div>
//                 <FormLabel>Choose Amenities</FormLabel>
//                 <FormDescription>Choose amenities popular in your hotel</FormDescription>
//                 <div className="grid grid-cols-2 gap-4 mt-2">
//                   {/* Checkboxes for amenities */}
//                   <FormField
//                     control={form.control}
//                     name="gym"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Gym</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="spa"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Spa</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="bar"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Bar</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="laundry"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Laundry Facilities</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="restaurant"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Restaurant</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="shopping"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Shopping</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="freeParking"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Free Parking</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="bikeRental"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Bike Rental</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="freeWifi"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Free Wifi</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="movieNights"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Movie Nights</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="swimmingPool"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Swimming Pool</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="coffeeShop"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
//                           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                         </FormControl>
//                         <FormLabel>Coffee Shop</FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
//               </Button>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default AddHotelForm;
