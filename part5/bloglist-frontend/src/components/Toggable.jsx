// import { useState, forwardRef, useImperativeHandle } from "react";

// const Togglable = forwardRef((props, refs) => {
//   const [visible, setVisible] = useState(false);

//   const toggleVisibility = () => {
//     setVisible(!visible);
//   };

//   useImperativeHandle(refs, () => {
//     return {
//       toggleVisibility,
//     };
//   });

//   return (
//     <>
//       {visible ? (
//         <>
//           {props.children}
//           <button onClick={toggleVisibility}>cancel</button>
//         </>
//       ) : (
//         <>
//           <button onClick={toggleVisibility}>{props.buttonLabel}</button>
//         </>
//       )}
//     </>
//   );
// });

// export default Togglable;

import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      {visible ? (
        <>
          {children}
          <button onClick={toggleVisibility}>{closeLabel}</button>
        </>
      ) : (
        <>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </>
      )}
    </>
  );
});

export default Togglable;
