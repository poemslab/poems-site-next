import { useRouter } from "next/router"
import MainLayout from "../components/MainLayout"

export default function Error() {
  return (
    <MainLayout title='Ошибка'>
      <h1>Произошла ошибка, повторите попытку позже</h1>
    </MainLayout>
  )
}