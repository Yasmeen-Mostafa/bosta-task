import { Card, CardContent, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Array of tracking numbers
const trackingNumbers = ["6636234", "7234258", "9442984", "1094442"];

const ShipmentsListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = (trackingNumber: string) => {
    navigate(`/shipments/track/${trackingNumber}`);
  };

  return (
    <Stack sx={{ flexDirection: "row", gap: 3, flexWrap: "wrap" }}>
      {trackingNumbers.map((trackingNumber) => (
        <Card
          variant="outlined"
          sx={{
            borderRadius: "8px",
            cursor: "pointer",
            "&:hover": {
              boxShadow: 1,
            },
          }}
          onClick={() => handleCardClick(trackingNumber)}
        >
          <CardContent>
            <Typography variant="h6">
              {`${t("shipment-details.shipment_number")}: ${trackingNumber}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ShipmentsListPage;
