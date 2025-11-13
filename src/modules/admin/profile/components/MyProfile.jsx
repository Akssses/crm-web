import { Button, Container } from "@/ui";
import { FaTools } from "react-icons/fa";
import s from "../styles/MyProfile.module.scss";
import { MdEmail, MdLocalPhone, MdWatchLater } from "react-icons/md";
import { RxExit } from "react-icons/rx";

export default function MyProfile() {
  const infoData = [
    { id: 1, icon: MdEmail, type: "Email:", text: "andrey@crm.io" },
    { id: 2, icon: MdLocalPhone, type: "Телефон:", text: "+996 500 123 456" },
    {
      id: 3,
      icon: MdWatchLater,
      type: "Последний вход:",
      text: "andrey@crm.io",
    },
  ];
  return (
    <Container size="full" className={s.my}>
      <div className={s.bloks}>
        <div className={s.images}></div>
        <div className={s.block}>
          <div className={s.header}>
            <h2>Андрей Клауд</h2>
            <div className={s.box}>
              <FaTools size={18} />
              <span>Администратор</span>
            </div>
          </div>
          <div className={s.list}>
            {infoData.map((info) => {
              const IconComponent = info.icon;
              return (
                <div key={info.id} className={s.info}>
                  <IconComponent size={18} />
                  <span>{info.type}</span>
                  <p>{info.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Button icon={RxExit} variant="red">
        Выйти из аккаунта
      </Button>
    </Container>
  );
}
