import React from "react";
import { Card, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { FaEllipsisH } from "react-icons/fa";
import linearGradient from "assets/theme/functions/linearGradient";
import WordCloud from "react-d3-cloud";

const fontSizeMapper = (word) => Math.log2(word.value) * 50;

function ReferralTracking(words2) {
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
            Word Cloud
          </VuiTypography>
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
