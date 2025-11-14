import React from "react";
import s from "../styles/Fast.module.scss";
import { HiOutlinePlus } from "react-icons/hi2";
import { MdOutlineFileDownload } from "react-icons/md";
import { Button, Container } from "@/ui";

export default function Fast() {
  return (
    <Container size="full">
      <div className={s.fast}>
        <h5>Быстрые действия</h5>
        <Button variant="bgblue" icon={HiOutlinePlus}>
          Добавить поставщика
        </Button>
        <Button variant="bgblue" icon={HiOutlinePlus}>
          Добавить организацию
        </Button>
        <Button variant="bgblue" icon={HiOutlinePlus}>
          Создать пользователя
        </Button>
        <Button variant="outline" icon={MdOutlineFileDownload}>
          Import/Export
        </Button>
      </div>
    </Container>
  );
}
