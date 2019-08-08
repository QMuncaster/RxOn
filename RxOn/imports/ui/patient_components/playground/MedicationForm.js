import React, { Component } from 'react';
import FormInputFields from './FormInputFields';
import ImageUpload from './ImageUpload';
import ConfirmationPage from './ConfirmationPage';
import Success from './Success';

export class MedicationForm extends Component {
   state = {
      step: 1,
      rxName: '',
      rxStrength: '',
      rxDose: '',
      imgLink: '',
   };

   // Proceed to next step
   nextStep = () => {
      const { step } = this.state;
      this.setState({
         step: step + 1,
      });
   };

   // Go back to prev step
   prevStep = () => {
      const { step } = this.state;
      this.setState({
         step: step - 1,
      });
   };

   // Handle fields change
   handleChange = input => e => {
      this.setState({ [input]: e.target.value });
   };

   setViewLink = val => {
      this.setState({ imgLink: val });
   };

   render() {
      const { step } = this.state;
      const { rxName, rxStrength, rxDose, imgLink } = this.state;
      const values = { rxName, rxStrength, rxDose, imgLink };

      switch (step) {
         case 1:
            return (
               <FormInputFields
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  values={values}
               />
            );
         case 2:
            return (
               <ImageUpload
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  setLink={this.setViewLink}
                  values={values}
               />
            );
         case 3:
            return (
               <ConfirmationPage
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  values={values}
               />
            );
         case 4:
            return <Success />;
      }
   }
}

export default MedicationForm;
