import {
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  styled,
  stepConnectorClasses,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React from "react";
import { useTranslation } from "react-i18next";

enum statusCode {
  delivered = 45,
  returned = 46,
}

interface StepDetails {
  label: string;
  value: string;
  icon: JSX.Element;
}

const CustomStepper = ({ codeNumber }: { codeNumber: number }) => {
  const { t, i18n } = useTranslation();
  const shipmentDetails: StepDetails[] = [
    {
      label: t("shipment-details.shipment_created"),
      value: "3 January 2020",
      icon: <BorderColorIcon fontSize="large" />,
    },
    {
      label: t("shipment-details.shipment_received_from_merchant"),
      value: "5 January 2020 at 5:33 PM",
      icon: <TransferWithinAStationIcon fontSize="large" />,
    },
    {
      label: t("shipment-details.shipment_out_for_delivery"),
      value: "7 January 2020",
      icon: <DirectionsCarIcon fontSize="large" />,
    },
    {
      label: t("shipment-details.shipment_delivered"),
      value: "10 January 2020",
      icon: <DomainVerificationIcon fontSize="large" />,
    },
  ];

  // Active step based on the codeNumber
  const activeStep =
    codeNumber === statusCode.delivered
      ? shipmentDetails.length // All steps completed
      : codeNumber === statusCode.returned
      ? 2 // Stop at "Shipment out for delivery"
      : 0; // Default to 0 if no valid codeNumber

  const getStepIcon = (stepIndex: number): JSX.Element => {
    if (codeNumber === statusCode.delivered) {
      return (
        <CheckCircleIcon
          fontSize="large"
          sx={{ color: "green", margin: "-5px" }}
        />
      );
    }

    if (codeNumber === statusCode.returned && stepIndex < activeStep) {
      return (
        <CheckCircleIcon
          fontSize="large"
          sx={{ color: "orange", margin: "-5px" }}
        />
      );
    }

    if (codeNumber === statusCode.returned && stepIndex === activeStep)
      return React.cloneElement(shipmentDetails[stepIndex].icon, {
        sx: { color: "orange", margin: "-5px" },
      });

    return React.cloneElement(shipmentDetails[stepIndex].icon, {
      sx: { color: "lightGray", margin: "-5px" },
    });
  };

  const CustomConnecter = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: i18n.language === "ar" ? "calc(50% + 16px)" : "calc(-50% + 16px)",
      right: i18n.language === "ar" ? "calc(-50% + 16px)" : "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: codeNumber === statusCode.returned ? "orange" : "green",
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: codeNumber === statusCode.returned ? "orange" : "green",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      ...theme.applyStyles("dark", {
        borderColor: theme.palette.grey[800],
      }),
    },
  }));

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomConnecter />}
      sx={{
        marginTop: "20px",
        "& .MuiStep-root": {
          margin: "0 !important",
        },
      }}
    >
      {shipmentDetails.map((step, index) => (
        <Step key={index} completed={index < activeStep}>
          <StepLabel
            icon={getStepIcon(index)}
            sx={{
              fontWeight: "700 !important",

              "&. MuiStepLabel-labelContainer": {
                "&. MuiStepLabel-label": {
                  fontWeight: "700 !important",
                },
              },
            }}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
