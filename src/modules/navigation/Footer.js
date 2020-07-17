//** */ @jsx jsx */
import React from "react";
import { Flex, Box, Image, jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Icon } from "@makerdao/dai-ui-icons";

import { useTranslation } from "@modules/localization";
import {getLinkIcon, Link} from '@modules/navigation';

const Footer = () => {
  const { locale, DEFAULT_LOCALE } = useTranslation();

  const { footerFiles, socialLinks } = useStaticQuery(graphql`
    query FooterQuery {
      #Get header.mdx files from only the top level locale folders. (ie. /content/en/header.mdx)
      footerFiles: allMdx(
        filter: {
          fileAbsolutePath: { regex: "//content/([^/]+)/?/(footer.mdx)$/" }
        }
      ) {
        nodes {
          fileAbsolutePath
          body
        }
      }

      socialLinks: allMdx(
        filter: {
          fileAbsolutePath: {regex: "//content/([^/]+)/?/(social.mdx)$/"}
        }
      ) {
        nodes {
          fileAbsolutePath
          internal {
            content
          }
        }
      }
    }
  `);

  const footerConfigLinks =
    DEFAULT_LOCALE !== locale
      ? footerFiles.nodes.find((n) =>
          n.fileAbsolutePath.includes(`/${locale}/`)
        )
      : [];

  //Default locale fallback
  const defaultLocaleFooterLinks = footerFiles.nodes.find((n) =>
    n.fileAbsolutePath.includes(`/${DEFAULT_LOCALE}/`)
  );

  const footerLinks =
    footerConfigLinks && footerConfigLinks.length !== 0
      ? footerConfigLinks.body
      : defaultLocaleFooterLinks
      ? defaultLocaleFooterLinks.body
      : null;

  const socialConfigLinks = 
    DEFAULT_LOCALE !== locale
      ? socialLinks.nodes.find((n) =>
        n.fileAbsolutePath.includes(`/${locale}/`)
      )
      : [];

  const defaultSocialConfigLinks = socialLinks.nodes.find((n) =>
    n.fileAbsolutePath.includes(`/${DEFAULT_LOCALE}/`)
  );

  const _socialLinks = socialConfigLinks && socialConfigLinks.length !== 0
    ? socialConfigLinks.internal.content.trim().split('\n')
    : defaultSocialConfigLinks
    ? defaultSocialConfigLinks.internal.content.trim().split('\n')
    : null;


  return (
    <Box
      as="footer"
      sx={{
        width: "100%",   
        bg: "backgroundAlt",
      }}>
      <Flex sx={{
        py: '54px',
        px: '52px',
        maxWidth: '1364px',
        margin: 'auto'

      }}>
        <Box sx={{color: 'onBackgroundAlt', display: 'inline-block', width: '217px', '& > *, & svg': {color: 'onBackgroundAlt', }}}>
          <Link to="/" sx={{display: 'inline-block', mb: '31px'}}>
            <Icon name="makerLogo" sx={{width: '217px', height:'30px', display: 'block'}} />
          </Link>
          <Box sx={{'& > a:not(:last-of-type)': {mr: '24px'}}}>
            {_socialLinks.map((s, index) => {
            const link = s.match(/\(([^)]+)\)/)[1];

            return link ? getLinkIcon(link, `footer-social-link-${index}`) : null;
          })}
          {/* <a href="javascript:gaOptout();">Deactivate Google Analytics</a> */}
          </Box>
        </Box>
        <Box
          sx={{
            ml: '106px',
            display: 'inline-block',
            width: "calc(100% - 106px - 217px)",
            verticalAlign: 'top',
            "& > * > ul": {
              m: 0,
              p: 0,
              color: "text",
              listStyleType: "none",
              flex: 1,
              display: 'flex',
              "& > li:not(:last-of-type)": {
                mr: "80px",
              },
              "& > li": {
                fontWeight: "bold",
                fontSize: "1rem",
                color: "onBackgroundAlt",
                '& > *:first-child:not(ul)': {
                  mb: '8px'
                },
                "& > ul": {
                
                  fontSize: "1rem",
                  p: 0,

                  listStyleType: "none",
                  "& li:not(:last-of-type)": {
                    mb: "10px",
                  },
                  "& a": {
                    color: "onBackgroundAlt",
                    fontWeight: "normal",
                    textDecoration: "none",
                    "& svg": {
                      display: "none",
                    },
                    "&:hover": {
                      textDecoration: 'none'
                    }
                  },
                },
              },
            },
          }}
        >
          {footerLinks && (
            <Box sx={{ flex: 1, }}>
              <MDXRenderer>{footerLinks}</MDXRenderer>
            </Box>
          )}
          
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
