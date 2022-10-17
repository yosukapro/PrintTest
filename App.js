import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {
  BLEPrinter,
} from "react-native-thermal-receipt-printer";

export default function App() {

  useEffect(() => {
    BLEPrinter.init().then(() => {
      BLEPrinter.connectPrinter('0D067C3B-4892-141A-EA55-0591EFBF2627')
      .then(res => {
        console.log("res", res)
      }).catch(e => {
        console.log("Er", e)
      })
    })
  }, [])

  const pressPrint = () => {
    // const text = `<C>This is text sample to test print feature<C>`
    const text = `SIZE 30 mm, 25mm\r\nDIRECTION 0\r\nGAP 2 mm,0 mm\r\nREFERENCE 0,0\r\nDENSITY 6\r\nCLS\r\nTEXT 0,40,"1",0,1,1,"aaaaHH"\r\nTEXT 0,40,"1",0,1,1,"aaaaHH"\r\nPRINT 1,1\r\n` // This is text print?
    BLEPrinter.printBill(text)
    BLEPrinter.printText(text)
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.btnPrint} onPress={pressPrint}>
        <Text style={styles.txtPrint}>Print</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnPrint: {
    width: 200,
    height: 48,
    justifyContent: 'center',
    alignItems:  'center',
    backgroundColor: 'pink',
    borderRadius: 8
  },
  txtPrint: {
    color: '#FFF'
  }
})