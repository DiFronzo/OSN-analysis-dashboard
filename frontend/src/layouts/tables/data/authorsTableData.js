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

function truncString(str, max, add){
  add = add || '...';
  return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
}

function Author({ image, tweet, name }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={tweet} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {truncString(tweet,79, "...")}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {name}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Polarity({status, percentage}) {
  return (
    <VuiBox flexDirection="column">
      <VuiBadge
        variant="standard"
        badgeContent={status}
        color={percentage.color}
        size="xl"
        container
        sx={({ palette: { white, error }, borders: { borderRadius, borderWidth } }) => ({
          background: error.main,
          border: `${borderWidth[1]} solid ${error.main}`,
          borderRadius: borderRadius.md,
          color: white.main,
       })}
      />
      {"  "}
      <VuiTypography variant="button" color={percentage.color} fontWeight="bold" fontSize="100px">
        {"("+percentage.text+")"}
      </VuiTypography>
    </VuiBox>
  );
}

function StandardText({ text }) {
  return (
    <VuiTypography variant="caption" color="white" fontWeight="medium">
      {text}
    </VuiTypography>
  );
}

let percentage22 = {text: "-0.8", color: "error"}
export default {
  columns: [
    { name: "author", align: "left" },
    { name: "polarity", align: "left" },
    { name: "location", align: "left" },
    { name: "polarity_val", align: "center" },
    { name: "date", align: "center" },
    { name: "subjectivity", align: "center" },
  ],
  rows: [
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      polarity_val:<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" tweet="Elon Musk robbing people blind and laughing all the way to the bank laughing" name="elonmusk" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="California, US" />,
      "polarity value":<StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.9" />,
    },
    {
      author: <Author image="https://pbs.twimg.com/profile_images/766652495858896897/LjrJJB9a_400x400.jpg"
                      tweet="I am absolutely stunned by this exchange. Especially as I look back a few years and recall how the Trump kids were assaulted by the media."
                      name="donaldjtrumpjr" />,
      polarity: <Polarity status="Negative" percentage={percentage22} />,
      location: <StandardText text="New York, US" />,
      "polarity value": <StandardText text="1" />,
      date: <StandardText text="23/04/18" />,
      subjectivity: <StandardText text="0.7" />,
    }
  ],
};
