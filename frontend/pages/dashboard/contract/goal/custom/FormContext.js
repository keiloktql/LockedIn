import React, { createContext, useContext, useState } from "react";

// Create Context
const FormContext = createContext();

// Custom hook to use FormContext
export const useFormContext = () => {
  return useContext(FormContext);
};

// FormProvider component to wrap the app
export const FormProvider = ({ children }) => {
  const [goalData, setGoalData] = useState({
    name: "",
    commitmentFrequency: "Weekly",
    description: "",
    commitmentStartDate: "",
    commitmentEndDate: ""
  });

  const [stakingData, setStakingData] = useState({
    recipientOfStakes: "Anti-Charity"
  });

  const updateGoalData = (newData) => {
    setGoalData((prevState) => ({ ...prevState, ...newData }));
  };

  const updateStakingData = (newData) => {
    setStakingData((prevState) => ({ ...prevState, ...newData }));
  };

  return (
    <FormContext.Provider
      value={{
        goalData,
        stakingData,
        updateGoalData,
        updateStakingData
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
