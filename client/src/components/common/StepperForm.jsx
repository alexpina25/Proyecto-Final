import React from 'react';
import {
  Box,
  Step,
  StepIndicator,
  Stepper,
  Stack,
  useSteps,
  Button,
} from '@chakra-ui/react';

const StepperForm = ({ steps, stepContent, handleSubmit, onSubmit }) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <>
      <Stack>
        <Stepper size={'sm'} index={activeStep}>
          {steps.map((step, index) => (
            <Step
              key={index}
              onClick={() => setActiveStep(index)}
              color={'blanco'}
            >
              <StepIndicator color={'negro'}>{index + 1}</StepIndicator>
            </Step>
          ))}
        </Stepper>
        <Box p={4}>
          {stepContent(activeStep)}
          <Box mt={4}>
            {activeStep !== 0 && (
              <Button onClick={() => setActiveStep((s) => s - 1)}>
                Anterior
              </Button>
            )}
            {activeStep !== steps.length - 1 ? (
              <Button ml={2} onClick={() => setActiveStep((s) => s + 1)}>
                Siguiente
              </Button>
            ) : (
              <Button ml={2} onClick={() => handleSubmit(onSubmit)()}>
                Confirmar
              </Button>
            )}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default StepperForm;
