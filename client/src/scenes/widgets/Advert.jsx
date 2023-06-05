import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { light } from "@mui/material/styles/createPalette";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Also Check Out
        </Typography>
        <Typography color={light}>New!!!</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="/assets/avatar.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Pranshu Blog</Typography>
        <Typography color={medium}>dev.pranshu.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Be a Part of My journey...
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
