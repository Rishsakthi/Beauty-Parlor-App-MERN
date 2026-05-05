import { Box,Dialog,ImageList,ImageListItem, Popover } from "@mui/material"
import format1 from "../assets/format1.jpg"
import format2 from "../assets/format2.jpg"
import format3 from "../assets/format3.jpg"
import format4 from "../assets/format4.jpg"
import format5 from "../assets/format5.jpg"
import format6 from "../assets/format6.jpg"
import format7 from "../assets/format7.jpg"
import format8 from "../assets/format8.jpg"
import format9 from "../assets/format9.jpg"
import { useState } from "react"


export default function Gallery(){

const itemData=[
    {img:format1}, {img:format2}, {img:format3}, {img:format4}, {img:format5}, {img:format6},
    {img:format7}, {img:format8}, {img:format9}
]
const [open, setOpen] = useState(false);
const[selected,setSelected]=useState(null);

const handleclick=(img)=>{
    setSelected(img);
    setOpen(true);

}
const handleclose=()=>{
    setOpen(false);
}
    return(
        <>
            <ImageList
                sx={{
                    width: "100%",
                    background: "black",
                    margin: 0,
                }}
                variant="woven"
                cols={3}
                gap={8}
                >
                {itemData.map((item, index) => (
                <ImageListItem
                    key={index}
                    sx={{
                        overflow: "hidden", 
                    }}
                >
                    <Box
                        component="img"
                        src={item.img}
                        alt={`gallery-${index}`}
                        loading="lazy"
                        sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        "&:hover": {
                            transform: "scale(1.1)",
                        },
                        }}
                        onClick={()=>{handleclick(item.img)}}
                    />
                </ImageListItem>
                ))}
            </ImageList>
                <Dialog open={open} onClose={handleclose}>
                    <Box
                    component="img"
                    src={selected}
                    sx={{ width: "500px" }}
                    />
                </Dialog>
        </>
    )
}