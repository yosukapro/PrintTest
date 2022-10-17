import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {BLEPrinter} from 'react-native-thermal-receipt-printer';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      async enabled => {
        console.log('enabled', enabled); // enabled ==> true /false
        if (!enabled) await BluetoothManager.enableBluetooth();
        BluetoothManager.scanDevices().then(
          s => {
            console.log('S', s);
            setLoading(false);
          },
          er => {
            setLoading(false);
            alert('error' + JSON.stringify(er));
          },
        );
      },
      err => {
        alert(err);
      },
    );
  }, []);

  const pressPrint = () => {
    // const text = `<C>This is text sample to test print feature<C>`
    const text = `SIZE 30 mm, 25mm\r\nDIRECTION 0\r\nGAP 2 mm,0 mm\r\nREFERENCE 0,0\r\nDENSITY 6\r\nCLS\r\nTEXT 0,40,"1",0,1,1,"aaaaHH"\r\nTEXT 0,40,"1",0,1,1,"aaaaHH"\r\nPRINT 1,1\r\n`; // This is text print?

    BluetoothTscPrinter.printLabel({
      width: 40,
      height: 30,
      gap: 20,
      direction: BluetoothTscPrinter.DIRECTION.FORWARD,
      reference: [0, 0],
      tear: BluetoothTscPrinter.TEAR.ON,
      sound: 0,
      text: [
        {
          text: text,
          x: 20,
          y: 0,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        },
        {
          text: '你在说什么呢?',
          x: 20,
          y: 50,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        },
      ],
    }).then(()=>{
      console.log("Success print!!!!!!")
      //success
  },
  (err)=>{
    console.log("Erorr print!!!!!!")
      //error
  });
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.btnPrint}
        onPress={pressPrint}
        disabled={loading}>
        <Text style={styles.txtPrint}>Print</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrint: {
    width: 200,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  txtPrint: {
    color: '#FFF',
  },
});
