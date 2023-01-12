import { Grid, Link, Paper, PaperProps, styled } from '@mui/material';

import Logo from '../../assets/book-apple.svg';
import React from 'react';

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  left: 0,
  bottom: 0,
}));

const FooterGird = styled(Grid)<PaperProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const FooterLinks = styled(Link)<PaperProps>(({ theme }) => ({
  cursor: 'pointer',
}));

const Footer = (): JSX.Element => {
  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={1}>
        <FooterGird item xs={2}>
          <img src={Logo} alt="Logo" />
        </FooterGird>
        <FooterGird item xs={2}>
          <FooterLinks>Home</FooterLinks>
        </FooterGird>
        <FooterGird item xs={2}>
          <FooterLinks>Link 2</FooterLinks>
        </FooterGird>
        <FooterGird item xs={5} style={{ justifyContent: 'flex-end' }}>
          <p>@ 2020 Morning App. All rights Reserved.</p>
        </FooterGird>
      </Grid>
    </StyledPaper>
  );
};

export default Footer;
