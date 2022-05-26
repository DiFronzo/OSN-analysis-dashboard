import React, { useState } from "react";
import { Card, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { FaEllipsisH } from "react-icons/fa";
import linearGradient from "assets/theme/functions/linearGradient";
import WordCloud from "react-d3-cloud";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

const fontSizeMapper = (word) => Math.log2(word.value) * 50;

function ReferralTracking(words2) {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Positive</MenuItem>
      <MenuItem onClick={closeMenu}>Neutral</MenuItem>
      <MenuItem onClick={closeMenu}>Negative</MenuItem>

    </Menu>
  );

  const { info, gradients } = colors;
  const { cardContent } = gradients;

  const defaultSize = 140;
  const defaultGap = 70;

  return (
    <Card
      sx={{
        height: "100%",
        background: linearGradient(
          gradients.cardDark.main,
          gradients.cardDark.state,
          gradients.cardDark.deg
        ),
      }}
    >
      <VuiBox sx={{ width: "100%" }}>
        <VuiBox
          display="flex"
          alignItems="center"
          justifyContent="space-beetween"
          sx={{ width: "100%" }}
          mb="40px"
        >
          <VuiTypography variant="lg" color="white" mr="auto" fontWeight="bold">
            Word Cloud {renderMenu}
          </VuiTypography>
          <VuiTypography variant="lg" color="white">
            (Positive)
          </VuiTypography>
          <VuiBox display="flex" color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
              more_vert
            </Icon>
          </VuiBox>
        </VuiBox>
        <VuiBox
          flexDirection="column"
          display="flex"
          sx={{ height: "200px" }}
        >
          <WordCloud data={words2["words2"]} fontSizeMapper={fontSizeMapper} width={defaultSize}
                     height={defaultGap}/>,

        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;
