import React from 'react'
import { Box, Typography, Link, Grid } from '@mui/material'

export const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#333', color: '#fff', p: 3, mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Sobre Nosotros</Typography>
                    <Link href="/aboutus" color="inherit" underline="none">
                        Conócenos
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Ayuda</Typography>
                    <Link href="/faq" color="inherit" underline="none">
                        FAQ
                    </Link>
                    <Link href="/contactus" color="inherit" underline="none">
                        Contacto
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Política Legal</Typography>
                    <Link
                        href="/privacypolicy"
                        color="inherit"
                        underline="none"
                    >
                        Política de privacidad
                    </Link>
                    <Link
                        href="/termsofservice"
                        color="inherit"
                        underline="none"
                    >
                        Términos de servicio
                    </Link>
                </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" align="center">
                    © 2023 Nombre de tu Aplicación
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer
