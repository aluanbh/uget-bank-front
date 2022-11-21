import { memo, useEffect } from "react";
import Alert, { AlertHeading } from "../../bootstrap/Alert";


function AlertCustom({ show, title, msm, icon, color, timer, onClose }) {

  useEffect(() => {
    if(!show) return;
    
    const timeout = setTimeout(onClose, timer);

    return () => clearTimeout(timeout)
  },[show])

  return(
    <div style={{ marginTop: 20, position: 'absolute', alignSelf: 'center', zIndex: 9999 }} hidden={!show}>
      <Alert
        icon={icon}
        isLight
        isOutline
        color={color || 'primary'}
        borderWidth={3}
        shadow='lg'>
        <AlertHeading tag='h4'>
          {title}
        </AlertHeading>
        <blockquote className='blockquote'>
          <p>{msm}</p>
        </blockquote>
      </Alert>
    </div>
  );
}

export default memo(AlertCustom);