import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    return { isSuccess: true }
  } catch (e) {
    return { isSuccess: false, detail: e }
  }
}
const getData = async (key) => {
  try {
    const Jsonvalue = await AsyncStorage.getItem(key)
    const value = Jsonvalue != null ? JSON.parse(Jsonvalue) : null
    return { isSuccess: true, data: value }
  } catch (e) {
    return { isSuccess: false, detail: value }
  }
}
const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  }
  catch (e) {
    return false
  }
}
export { storeData, getData, clearData }