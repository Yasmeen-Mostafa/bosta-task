import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import WarningIcon from "@mui/icons-material/Warning";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import ShipmentDetailsTable, {
  TableColumn,
} from "../../components/ShipmentDetailsTable/ShipmentDetailsTable";
import ImagesSrc from "../../utils/ImagesSrc";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchShipmentDetails } from "../../store/features/shipmentDetails/slice";
import "dayjs/locale/ar"; // Import Arabic locale
const ShipmentsDetailsPage = () => {
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();
  const { trackingNumber } = useParams();
  const { details, isLoading, error } = useAppSelector(
    (state) => state.shipment
  );
  useEffect(() => {
    dispatch(
      fetchShipmentDetails({ id: Number(trackingNumber), lang: i18n.language })
    ); // Fetch shipment with ID 123
  }, [dispatch, trackingNumber, i18n]);
  const cardHeader = [
    {
      label: `${t("shipment-details.shipment_number")} ${trackingNumber}`,
      value: details?.CurrentStatus?.state, // dynamic
    },
    {
      label: t("shipment-details.last_update"),
      value: dayjs(details?.CreateDate)
        .locale(i18n.language)
        .format("dddd DD MMMM YYYY HH:mm A"), // dynamic
    },
    {
      label: t("shipment-details.merchant_name"),
      value: "Test name", // dynamic
    },
    {
      label: t("shipment-details.delivery_due_in"),
      value: dayjs(details?.PromisedDate)
        .locale(i18n.language)
        .format("DD MMMM YYYY"), // dynamic
    },
  ];

  // Define columns with specific alignment
  const columns: TableColumn[] = [
    {
      id: "branch",
      label: t("shipment-details.branch"),
      align: i18n.language === "ar" ? "right" : "left",
    },
    {
      id: "date",
      label: t("shipment-details.date"),
      align: i18n.language === "ar" ? "right" : "left",
    },
    {
      id: "time",
      label: t("shipment-details.time"),
      align: i18n.language === "ar" ? "right" : "left",
    },
    {
      id: "details",
      label: t("shipment-details.details"),
      align: i18n.language === "ar" ? "right" : "left",
    },
  ];

  // Mock data for the table
  const tableData = [
    {
      branch: "Madinat Nasr",
      date: "22-2-2023",
      time: "5pm",
      details: t("shipment-details.shipment_received_from_merchant"),
    },
    {
      branch: "Madinat Nasr",
      date: "23-2-2023",
      time: "6pm",
      details: t("shipment-details.shipment_created"),
    },
    {
      branch: "Madinat Nasr",
      date: "24-2-2023",
      time: "7pm",
      details: t("shipment-details.shipment_created"),
    },
  ];

  return isLoading ? (
    <Stack
      sx={{
        marginY: "30vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="30px" color="error" sx={{ marginX: "auto" }} />
    </Stack>
  ) : error ? (
    <Card
      sx={{ backgroundColor: "#ffe5e3", display: "flex", padding: 2, gap: 2 }}
    >
      <WarningIcon color="error" />
      <CardContent sx={{ padding: "0 !important", fontSize: "16px" }}>
        {t("shipment-details.not-found")}
      </CardContent>
    </Card>
  ) : (
    <Stack gap="25px">
      <Card variant="outlined">
        <CardContent sx={{ padding: 0 }}>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              padding: 3,
              flexWrap: "wrap",
              rowGap: "10px",
            }}
          >
            {cardHeader.map((item, index) => (
              <Box key={index}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "14px", color: "GrayText" }}
                >
                  {item.label}
                </Typography>
                <Typography>{item.value}</Typography>
              </Box>
            ))}
          </Stack>
          <Divider />
          {details && (
            <CustomStepper codeNumber={details?.CurrentStatus?.code} />
          )}
        </CardContent>
      </Card>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Stack width={{ xs: "100%", md: "65%" }} gap="15px">
          <Typography>{t("shipment-details.shipment_details")}</Typography>
          <ShipmentDetailsTable columns={columns} data={tableData} />
        </Stack>
        <Stack width={{ xs: "100%", md: "35%" }} gap="15px">
          <Stack gap="10px">
            <Typography>{t("shipment-details.delivery_address")}</Typography>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#f5f5f996",
                borderColor: "rgba(224, 224, 224, 1)",
              }}
            >
              <CardContent>{`${details?.DropOffAddress?.firstLine}`}</CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                borderColor: "rgba(224, 224, 224, 1)",
                display: "flex",
              }}
            >
              <CardMedia
                component="img"
                sx={{ maxWidth: "35%", maxHeight: "100%" }}
                image={ImagesSrc.questionVector}
                alt="Live from space album cover"
              />
              <Stack
                flexDirection={"column"}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                {" "}
                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: "12px",
                    paddingBottom: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {t("shipment-details.problem_in_shipment")}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      textTransform: "none",
                    }}
                  >
                    {t("shipment-details.report_a_problem")}
                  </Button>
                </CardActions>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ShipmentsDetailsPage;
