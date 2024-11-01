// import { Children } from "react";

// const Container = ({Children} : {children: React.ReactNode}) => {
//     return (<div className="max-w-[1920px] w-full mx-auto x1:px-20 px-4 py-4">
//             {Children}
//     </div>);
// }

// export default Container



import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[1920px] w-full mx-auto xl:px-20 px-4 py-4">
            {children}
        </div>
    );
};

export default Container;
