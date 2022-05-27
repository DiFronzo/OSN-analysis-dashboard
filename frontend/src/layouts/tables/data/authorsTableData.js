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

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

import { useState } from "react";

function truncString(str, max, add){
  add = add || '...';
  return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
}

export function Author({ image, tweet, name }) {
  const [text, setText] = useState(0);

  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={tweet} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
            <div onMouseEnter={e=> setText(1)} onMouseLeave={e=> setText(0)}>
              {truncString(tweet,79, "...")}
             {/* {tweet.length > 79 ? (<p style={{opacity: `${text}`}}>{tweet}</p>) : ""}*/}
            </div>
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {name}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

export function Polarity({status}) {
  return (
    <VuiBox flexDirection="column">
      <VuiBadge
        variant="standard"
        badgeContent={status}
        size="l"
        container
        sx={getColor(status)}
      />
    </VuiBox>
  );
}

export function StandardText({ text }) {
  return (
    <VuiTypography variant="caption" color="white" fontWeight="medium">
      {truncString(text,40, "...")}
    </VuiTypography>
  );
}

export function GetAnalysis(score){
  if (score < 0){
    return 'Negative'
  } else if (score === 0){
    return 'Neutral'
  } else {
    return 'Positive'
  }
}

function getColor(text){
  if (text === 'Negative'){
    return ({ palette: { white, error }, borders: { borderRadius, borderWidth } }) => ({
      background: error.main,
      border: `${borderWidth[1]} solid ${error.main}`,
      borderRadius: borderRadius.md,
      color: white.main,
    })
  } else if (text === 'Neutral'){
    return ({ palette: { white, primary }, borders: { borderRadius, borderWidth } }) => ({
      background: primary.main,
      border: `${borderWidth[1]} solid ${primary.main}`,
      borderRadius: borderRadius.md,
      color: white.main,
    })
  } else {
    return ({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
      background: success.main,
      border: `${borderWidth[1]} solid ${success.main}`,
      borderRadius: borderRadius.md,
      color: white.main,
    })
  }
}