import { Grid, Link, Paper, PaperProps, styled } from '@mui/material';

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

const RightsGrid = styled(Grid)<PaperProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
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
          <p>Logo</p>
        </FooterGird>
        <FooterGird item xs={2}>
          <FooterLinks>Home</FooterLinks>
        </FooterGird>
        <FooterGird item xs={2}>
          <FooterLinks>Link 2</FooterLinks>
        </FooterGird>
        <RightsGrid item xs={5}>
          <p>@ 2020 Morning App. All rights Reserved.</p>
        </RightsGrid>
      </Grid>
    </StyledPaper>
  );
};

export default Footer;
