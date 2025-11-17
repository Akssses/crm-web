import React from "react";
import { FaUser, FaPlus, FaSave } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import s from "../../styles/HeaderOrganizations.module.scss";
import { Button } from "@/ui";

export default function HeaderOrganizations() {
  return (
    <div className={s.header}>
      <div className={s.user}>
        <div className={s.avatar}>
          <FaUser size={18} />
        </div>
        <h4>ООО “Asia Travel”</h4>
      </div>
      <div className={s.buttons}>
        <Button icon={FaPenToSquare}>Редактировать</Button>
        <Button variant="bggreen" icon={FaPlus}>
          Добавить сотрудника
        </Button>
        <Button variant="bggray" icon={FaSave}>
          Сохранить
        </Button>
        <Button variant="bgred" icon={MdDelete}>
          Архивировать
        </Button>
      </div>
    </div>
  );
}
