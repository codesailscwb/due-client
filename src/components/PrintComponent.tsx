import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type PrintComponentProps = React.PropsWithChildren<{}>;

const PrintComponent = ({ children }: PrintComponentProps) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>{children}</div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PrintComponent;
