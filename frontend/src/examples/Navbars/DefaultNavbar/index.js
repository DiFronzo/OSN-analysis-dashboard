/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function DefaultNavbar({ transparent, light, action }) {
  const { borderCol } = colors;
  const { borderWidth } = borders;

  return (
    <Container>
      <VuiBox
        py={2}
        px={{ xs: transparent ? 4 : 3, sm: transparent ? 2 : 3, lg: transparent ? 0 : 3 }}
        my={2}
        border={`${borderWidth[1]} solid ${borderCol.navbar}`}
        width="calc(100% - 48px)"
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left="50%"
        zIndex={3}
        maxWidth="1044px"
        sx={({ palette: { gradients }, functions: { linearGradient } }) => ({
          backgroundColor: linearGradient(
            gradients.navbar.main,
            gradients.navbar.state,
            gradients.navbar.deg
          ),
          backdropFilter: "blur(42px)",
          transform: "translate(-50%, 0px)",
        })}
      >
        <VuiBox component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
          <VuiTypography
            variant="button"
            textGradient={true}
            color="logo"
            fontSize={14}
            letterSpacing={2}
            fontWeight="medium"
            sx={{
              margin: "0 auto",
            }}
          >
            OSN Dashboard
          </VuiTypography>
        </VuiBox>
        {action &&
          (action.type === "internal" ? (
            <VuiBox display={{ xs: "none", lg: "inline-block" }}>
              <VuiButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </VuiButton>
            </VuiBox>
          ) : (
            <VuiBox display={{ xs: "none", lg: "inline-block" }}>
              <VuiButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                color={action.color ? action.color : "info"}
                sx={({ typography: { size }, functions: { pxToRem } }) => ({
                  fontSize: pxToRem(size.sm),
                })}
              >
                {action.label}
              </VuiButton>
            </VuiBox>
          ))}
      </VuiBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
