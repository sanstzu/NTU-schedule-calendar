import { Box, Typography, Chip, Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
const Footer = () => {
    return (
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', width: 1, height: '50px', marginTop: 'auto', p: 2, borderRadius: '2px 2px 0 0'}}>
            <Typography sx={{mr:1}} color={grey[400]}>
                Made by
            </Typography>
                <Chip
                    variant='outlined' 
                    avatar={<Avatar alt='sanstzu' src='https://github.com/sanstzu.png' />} 
                    component="a" 
                    href="https://github.com/sanstzu" 
                    target="_blank" 
                    label='sanstzu'
                    color='primary'
                    clickable/>
            <Typography sx={{ml:1}} color={grey[400]}>
                (last updated on June 16th, 2023)
            </Typography>
        </Box>
    )
}

export default Footer;