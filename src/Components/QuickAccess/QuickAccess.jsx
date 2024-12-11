import React from 'react';
import holder from '../../Assets/quick.svg';
import Select from 'react-select';
import { color } from 'framer-motion';

const QuickAccess = () => {
  // Define options for the dropdowns
  const dropdown1Options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const dropdown2Options = [
    { value: 'choice1', label: 'Choice 1' },
    { value: 'choice2', label: 'Choice 2' },
    { value: 'choice3', label: 'Choice 3' },
  ];

  const handleDropdown1Change = (selectedOption) => {
    console.log("Dropdown 1 Selected Option: ", selectedOption);
  };

  const handleDropdown2Change = (selectedOption) => {
    console.log("Dropdown 2 Selected Option: ", selectedOption);
  };
  const customStyles = {
    control: (base,state) => ({
      ...base,
      direction: 'rtl', // Force RTL direction
      textAlign: 'right',
      borderColor: state.isFocused ? '#00818D' : '#00818D',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 129, 141, 0.5)' : 'none', // Add subtle shadow on focus
      '&:hover': {
        borderColor: '#00818D', // Border color on hover
      }, // Align text to the right
    }),
    menu: (base) => ({
      ...base,
      direction: 'rtl',
      color:"#00818D",
      // Ensure the dropdown options are RTL
    }),
    singleValue: (base) => ({
      ...base,
      direction: 'rtl',
      color:"#00818D",
      // Align the selected value
    }),
    placeholder: (base) => ({
      ...base,
      direction: 'rtl',
      color:"#00818D",
      // Ensure the placeholder text is RTL
    }),
  };

  return (
    <div>
      <div
        className="relative flex flex-col items-center justify-center min-h-screen"
        style={{ transform: 'translateX(-30px)', marginTop: '-100px' }}
      >
        
        
        {/* Holder Image */}
        <div className="relative w-[1150px] h-[350px]">
          <img src={holder} alt="info" className="relative" />
          {/* Heading and Paragraph */}
          <div
            style={{
              // display:'flex',
              position: 'absolute',
              top: '150px', // Adjust to align above the dropdowns
              right: '100px',
              textAlign: 'right',
              // alignItems:'center',
              // width: '40%',
              lineHeight:"140%"
            }}
          >
            <h1 style={{ color: '#00818D', fontSize: '32px', fontWeight: '900' }}>
            وی‌کِر
            </h1>
            <p style={{ color: '#00818D', fontSize: '20px', fontWeight:'400' }}>
            ارائه دهنده خدمات بالینی در منزل            </p>
          </div>
          {/* Dropdown Container */}
          <div
            className="absolute flex space-x-4"
            style={{
              top: '250px', // Adjust vertical position
              right: '100px', // Adjust horizontal position
            }}
          >
            {/* Dropdown 1 */}
            <div className="w-72">
              <Select
                options={dropdown1Options}
                onChange={handleDropdown1Change}
                placeholder="نوع خدمات را انتخاب کنید"
                direction='rtl'
                styles={
                  customStyles
                }
              />
            </div>

            {/* Dropdown 2 */}
            <div className="w-28">
              <Select
                options={dropdown2Options}
                onChange={handleDropdown2Change}
                placeholder="شهر"
                direction='rtl'
                styles={
                  customStyles
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
