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


  const { info, gradients } = colors;
  const { cardContent } = gradients;

  const defaultSize = 140;
  const defaultGap = 70;

  return (
          <WordCloud data={words2["words2"]} fontSizeMapper={fontSizeMapper} width={defaultSize}
                     height={defaultGap}/>
  );
}

export default ReferralTracking;
