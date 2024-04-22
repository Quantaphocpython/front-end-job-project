import React from 'react'

function FilterJob() {
  return (
    <div className='flex justify-center m-8'>tính năng filter đang được update hihi</div>
  )
}

export default FilterJob








// 'use client'
// import React, { useState } from 'react';
// interface DropdownProps {
//   title: string;
//   options: string[];
// }
// const DropdownMenu: React.FC<DropdownProps> = ({ title, options }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="dropdown max-w-md mx-auto inline">
//       <button className="dropdown-toggle" onClick={toggleDropdown}>
//         {title}
//       </button>
//       {isOpen && (
//         <div className="dropdown-menu">
//           {options.map((option, index) => (
//             <div key={index} className="dropdown-item">
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function FilterJob() {
//   const [locationOptions] = useState(["Location 1", "Location 2", "Location 3"]);
//   const [categoryOptions] = useState(["Category 1", "Category 2", "Category 3"]);
//   const [typeOptions] = useState(["Type 1", "Type 2", "Type 3"]);
//   const [salaryOptions] = useState(["Salary 1", "Salary 2", "Salary 3"]);
//   const [experienceOptions] = useState(["Experience 1", "Experience 2", "Experience 3"]);

//   return (
//     <div className="filter-job">
//       <DropdownMenu title="Location" options={locationOptions} />
//       <DropdownMenu title="Category" options={categoryOptions} />
//       <DropdownMenu title="Type" options={typeOptions} />
//       <DropdownMenu title="Salary" options={salaryOptions} />
//       <DropdownMenu title="Experience" options={experienceOptions} />
//     </div>
//   );
// }

// export default FilterJob;
