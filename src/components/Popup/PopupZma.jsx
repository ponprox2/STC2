
import React, { useRef, useEffect } from 'react';
import {
  Page,
  zmp,
  Button,
  Navbar,
  App,
  View,
  Box,
  Card
} from 'zmp-framework/react';


const PopupZma = (props)=>{
    const dialog = useRef(null);
    
    dialog.current = zmp.dialog.create({
        title: 'Popup Title',
        closeByBackdropClick: true,
        destroyOnClose: true,
        content:
          '<input className="popup-input" type="text" value={param} onChange={(e) => {setParam(e.target.value);}}placeholder="https://s.sbh.so/"/>',
        on: {
          closed() {
            dialog.current = null;
          }
        },
        buttons: [
          {
            text: 'Negative Action',
            cssClass: 'dialog-negative-action',
            close: true
          },
          {
            text: 'Main Action',
            close: false,
            onClick() {
              console.log('main actions');
            }
          }
        ]
      });


    return props.trigger?(
        <Page className='dialog-page'>
        <Navbar title='Dialog' />
        <Box>
          <Card inset title='Dialog popup'>
            <Box>
              <Button typeName='secondary' onClick={dialog} fill>
                Popup CTA Horizontal
              </Button>
            </Box>
          </Card>
        </Box>
      </Page>
    ) : "";
}

export default PopupZma