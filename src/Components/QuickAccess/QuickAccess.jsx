import React, { useEffect, useState } from 'react';
import holder from '../../Assets/quick.svg';
import Select from 'react-select';
import { color } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../../slice/authSlice';

const QuickAccess = () => {

  const dispatch = useDispatch();
  const {cities,error,loading} = useSelector((state)=>state.auth);

  const [dropDownCity,setDropDownCity] = useState([]);

  useEffect(()=>{
    dispatch(fetchCities())
  },[dispatch])

  useEffect(()=>{
    if(cities && Array.isArray(cities)){
      const formattedOptions = cities.map((city)=>({
        value:city.id,
        label:city.name,
      }));
      setDropDownCity(formattedOptions);
    }
  },[cities])
  // Define options for the dropdowns
  const dropdown1Options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  

  const handleDropdown1Change = (selectedOption) => {
    console.log("Dropdown 1 Selected Option: ", selectedOption);
  };

  const handleDropdown2Change = (selectedOption) => {
    console.log("Dropdown 2 Selected Option: ", selectedOption);
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      direction: 'rtl', // RTL direction
      textAlign: 'right',
      borderColor: state.isFocused ? '#00818D' : '#00818D',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 129, 141, 0.5)' : 'none', // Subtle shadow on focus
      backgroundColor: 'white',
      '&:hover': {
        borderColor: '#00818D', // Border color on hover
      },
    }),
    menu: (base) => ({
      ...base,
      direction: 'rtl', // Ensure dropdown options are RTL
      color: '#00818D',
    }),
    menuList: (base) => ({
      ...base,
      textAlign: 'right', // Align text in the dropdown
    }),
    singleValue: (base) => ({
      ...base,
      direction: 'rtl',
      color: '#00818D', // Selected value color
      fontWeight: 'bold',
    }),
    placeholder: (base) => ({
      ...base,
      direction: 'rtl',
      color: '#00818D', // Placeholder color
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#E0F7F9' : 'white', // Highlight the focused option
      color: state.isSelected ? '#00818D' : '#333333', // Selected option text color
      textAlign: 'right', // Align text for options
      direction: 'rtl',
      '&:hover': {
        backgroundColor: '#E0F7F9', // Background color on hover
      },
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
            <h1 style={{ color: '#00818D', fontSize: '36px', fontWeight: '900' }}>
            وی‌کِر
            </h1>
            <p style={{ color: '#00818D', fontSize: '20px', fontWeight:'400' ,marginRight:0}}>
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
            <div className="w-28 ">
              <Select
                options={dropDownCity}
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
