import React from "react";
import { Button, Select } from "@/ui";
import { 
  MdFlight, 
  MdHotel, 
  MdDirectionsCar, 
  MdTour, 
  MdAssignment,
  MdMoreVert,
  MdFiberManualRecord
} from "react-icons/md";
import s from "../../styles/Step4.module.scss";

export default function Step4({ onBack, onFinish }) {
  const services = [
    { id: 1, type: "Авиа", icon: MdFlight, color: "blue", operator: "Иванова А.С.", status: "В работе", statusColor: "blue", assigned: true },
    { id: 2, type: "Отель", icon: MdHotel, color: "purple", operator: "Петрова В.", status: "Назначен", statusColor: "green", assigned: true },
    { id: 3, type: "Трансфер", icon: MdDirectionsCar, color: "orange", operator: null, status: "Не назначен", statusColor: "red", assigned: false },
    { id: 4, type: "Виза", icon: MdAssignment, color: "green", operator: "Кузнецова А.", status: "Ожидание", statusColor: "yellow", assigned: true },
    { id: 5, type: "Экскурсии", icon: MdTour, color: "red", operator: null, status: "Не назначен", statusColor: "red", assigned: false },
  ];

  const logs = [
    { id: 1, date: "13.11.25 | 14:30", text: "Система автоматически назначила на трансфер Смирнова", color: "blue" },
    { id: 2, date: "12.11.25 | 11:45", text: "Авиа → переназначена Ивановой", color: "green" },
    { id: 3, date: "11.11.25 | 16:20", text: "Отель → назначен Петровой", color: "purple" },
    { id: 4, date: "11.11.25 | 09:15", text: "Заявка создана", color: "gray" },
    { id: 5, date: "10.11.25 | 18:00", text: "Клиент оформил запрос", color: "orange" },
  ];

  return (
    <div className={s.container}>
      {/* Main Content - Distribution Table */}
      <div className={s.mainContent}>
        <h3 className={s.title}>Таблица распределения</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>Услуга</th>
              <th className={s.th}>Ответственный оператор</th>
              <th className={s.th}>Статус</th>
              <th className={s.th}>Комментарий</th>
              <th className={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className={`${s.row} ${!service.assigned ? s.unassigned : ''}`}>
                <td className={s.td}>
                  <div className={s.serviceCell}>
                    <service.icon className={`${s.serviceIcon} ${s[service.color]}`} />
                    {service.type}
                  </div>
                </td>
                <td className={s.td}>
                  <div className={s.operatorSelect}>
                    <Select 
                      options={[{ value: service.operator || "", label: service.operator || "Не назначен" }]} 
                      defaultValue={service.operator || ""}
                      placeholder="Не назначен"
                      fullWidth
                      size="sm"
                    />
                  </div>
                </td>
                <td className={s.td}>
                  <div className={`${s.statusBadge} ${s[service.statusColor]}`}>
                    <MdFiberManualRecord size={8} />
                    {service.status}
                  </div>
                </td>
                <td className={s.td}>
                  <button className={s.commentBtn}>Добавить комментарий</button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar - Change Log */}
      <div className={s.sidebar}>
        <h3 className={s.title}>Журнал изменений</h3>
        <div className={s.timeline}>
          {logs.map((log) => (
            <div key={log.id} className={s.timelineItem}>
              <div className={`${s.timelineDot} ${s[log.color] || ''}`} style={{ background: log.color === 'gray' ? '#9ca3af' : undefined }}></div>
              <div className={s.timelineDate}>{log.date}</div>
              <div className={s.timelineText}>{log.text}</div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
