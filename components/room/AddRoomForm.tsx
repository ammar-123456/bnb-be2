"use client"
import * as z from "zod"
import { Hotel, Room } from "@prisma/client";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil, PencilLine, XCircle } from "lucide-react";
import { UploadButton } from "../uploadthing";
import { useRouter } from "next/router";


interface AddHotelFormprops{
    hotel?: Hotel 
    room?: Room
    handleDialogueOpen: () => void
}

const formSchema = z.object({
  title: z.string().min(3,{
    message: "Title must be atleast 3 characters long."
  }),
  description: z.string().min(10,{
    message: "Description must be atleast 10 characters long."
  }),
  bedCount: z.coerce.number().min(1, {message: "bed count is required"}),
  guestCount: z.coerce.number().min(1, {message: "Guest count is required"}),
  bathroomCount: z.coerce.number().min(1, {message: "Bathroom count is required"}),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, {message: "Image is required"}),
  breakFastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, {message: "Room price is required"}),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),

})

const AddRoomForm = ({hotel, room, handleDialogueOpen}:AddHotelFormprops) => {

  const [image, setImage] = useState<string | undefined>(room?.image)
  const [imageIsDeleting, setImageIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {toast} = useToast()
  const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: room ||  {
            title: "",
            description: "",
            bedCount: 0,
            guestCount: 0,
            bathroomCount: 0,
            kingBed: 0,
            queenBed: 0,
            image: "",
            breakFastPrice: 0,
            roomPrice: 0,
            roomService: false,
            TV: false,
            balcony: false,
            freeWifi: false,
            cityView: false,
            oceanView: false,
            forestView: false,
            mountainView: false,
            airCondition: false,
            soundProofed: false,
            
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

      function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        if(hotel && room){
          axios.patch("/api/room/${room.id}", values).then((res) =>{
            toast({
              variant: "success",
              description: "Room Updated!"
            })
            router.reload()
              setIsLoading(false)
              handleDialogueOpen()
          }).catch((err) =>{
            console.log(err)
            toast({
              variant: "destructive",
              description: "Something went wrong!"
            })
            setIsLoading(false)
          })
        }else{
          if(!hotel?.id) return;
          axios.post("/api/room", {...values, hotelId: hotel.id}).then((res) =>{
              toast({
                variant: "success",
                description: "Room created!"
              })
              router.reload()
              setIsLoading(false)
              handleDialogueOpen()
          }).catch((err) =>{
            console.log(err)
            toast({
              variant: "destructive",
              description: "Something went wrong!"
            })
            setIsLoading(false)
          })
        }
      }

    return (<div className="max-h-[75vh] overflow-y-autopx-2">
        <Form {...form}> 
            <form className="space-y-6">
                      <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Room Title *</FormLabel>
                                        <FormDescription>
                                            Provide a room name
                                        </FormDescription>
                                        <FormControl>
                                            <Input placeholder="Double Room" {...field} />
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
                                    <FormLabel>Room Description *</FormLabel>
                                        <FormDescription>
                                            Is there anything special about this room?
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea placeholder="Have a beautiful ciewnof the ocean while in this room!" {...field} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                          <FormLabel>Choose Room Amenities</FormLabel>
                          <FormDescription>What makes this room a good choice?</FormDescription>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                          <FormField
                                control={form.control}
                                  name="roomService"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>24hrs Room Services</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="TV"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>TV</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="balcony"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Balcony</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="freeWifi"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Free Wifi</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="cityView"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>City View</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="oceanView"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Ocean View</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="forestView"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Forest View</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="mountainView"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Mountain View</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="airCondition"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Air Conditioned</FormLabel>
                                      </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                  name="soundProofed"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormControl className="flex flex-row items-end space-x-3 rounded-md border p-4">
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                          </FormControl>
                                        <FormLabel>Sound Proofed</FormLabel>
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
                              <FormDescription>Choose an image that will chow-case your room nicely</FormDescription>
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
                          <div className="flex flex-row gap-6">
                            <div className="flex-1 flex flex-col gap-6">
                              <FormField
                                control={form.control}
                                name="roomPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room Price in USD *</FormLabel>
                                            <FormDescription>
                                                State the price for staying in this room for 24hrs
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                                />
                               <FormField
                                control={form.control}
                                name="bedCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bed Count*</FormLabel>
                                            <FormDescription>
                                                How many beds are available in this room.
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} max={8} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                              />
                               <FormField
                                control={form.control}
                                name="guestCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Guest Count *</FormLabel>
                                            <FormDescription>
                                                How many guests are allowed in this room.
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} max={20} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                              />
                               <FormField
                                control={form.control}
                                name="bathroomCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bathroom Count *</FormLabel>
                                            <FormDescription>
                                                How many bathroom are in this room.
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} max={8} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                              />
                            </div>
                            <div className="flex-1 flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="breakFastPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Breakfast Price in USD</FormLabel>
                                            <FormDescription>
                                                State the price for staying in this room for 24hrs
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                                />
                               <FormField
                                control={form.control}
                                name="kingBed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>King Beds</FormLabel>
                                            <FormDescription>
                                                How many king beds are available in this room.
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} max={8} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                              />
                               <FormField
                                control={form.control}
                                name="queenBed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Queen Beds</FormLabel>
                                            <FormDescription>
                                                How many queen beds are in this room.
                                            </FormDescription>
                                            <FormControl>
                                                <Input type="number" min={0} max={20} {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                  )}
                              />
                               
                            </div>
                          </div>
                          <div className="pt-4 pb-2">
                          {room ? <Button onClick={form.handleSubmit(onSubmit)} type="button" className="max-w-[150px]" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4"/> Updating </> : <><PencilLine
                             className="mr-2 h-4 w-4"/>update </>}</Button> : <Button onClick={form.handleSubmit(onSubmit)} type="button"
                             className="max-w-[150px]" disabled={isLoading}>
                             {isLoading ? <><Loader2 className= "mr-2 h-4 w-4" />Creating</> : <><Pencil className="mr-2 h-4 w-4"/> Create Room</>}
                             </Button>}
                          </div>
            </form>
        </Form>
    </div>);
}

export default AddRoomForm;