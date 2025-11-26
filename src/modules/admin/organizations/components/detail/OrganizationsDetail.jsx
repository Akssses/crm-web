"use client";
import React, { useState } from "react";
import HeaderOrganizations from "./HeaderOrganizations";
import s from "../../styles/OrganizationsDetail.module.scss";
import MainInfo from "./MainInfo";
import Finance from "./Finance";
import {
  BankDetailsTable,
  BranchesTable,
  CollectionsTable,
  CommunicationChannelsTable,
  EmployeesTable,
  OrdersHistoryTable,
  LegalDocumentsTable,
  DocumentsTable,
} from "@/modules/admin/users/components/Table";
import { Button, Container } from "@/ui";
import { HiDocumentText } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import Servse from "./Servse";
import AddCollectionModal from "./modal/AddCollectionModal";
import AddAccountModal from "./modal/AddAccountModal";
import AddBranchModal from "./modal/AddBranchModal";
import AddEmployeeModal from "./modal/AddEmployeeModal";
import AddGroupModal from "./modal/AddGroupModal";
import AddPassengerModal from "./modal/AddPassengerModal";
import AddChannelModal from "./modal/AddChannelModal";

export default function OrganizationsDetail() {
  const [modals, setModals] = useState({
    collection: false,
    account: false,
    branch: false,
    employee: false,
    group: false,
    passenger: false,
    channel: false,
  });

  return (
    <div className={s.main}>
      <HeaderOrganizations />
      <div className={s.flex}>
        <MainInfo />
        <Finance />
      </div>
      <Container size="full">
        <div className={s.justi}>
          <h4>Сборы и таксы</h4>
          <div className={s.flex}>
            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, collection: true }))}
            >
              Добавить сбор
            </Button>
            <Button variant="bgblue" icon={HiDocumentText}>
              Экспортировать
            </Button>
          </div>
        </div>
        <CollectionsTable />
      </Container>
      <Container size="full">
        <div className={s.justi}>
          <h4>История заказов</h4>
          <div className={s.flex}>
            <Button variant="bgblue">Посмотреть все заказы</Button>
          </div>
        </div>
        <OrdersHistoryTable />
      </Container>
      <Container size="full">
        <div className={s.justi}>
          <h4>Банковские реквизиты</h4>
          <div className={s.flex}>
            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, account: true }))}
            >
              Добавить счёт
            </Button>
          </div>
        </div>
        <BankDetailsTable />
      </Container>
      <Container size="full">
        <div className={s.justi}>
          <h4>Филиалы</h4>
          <div className={s.flex}>
            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, branch: true }))}
            >
              Добавить филиал
            </Button>
          </div>
        </div>
        <BranchesTable />
      </Container>
      <Container size="full">
        <div className={s.justi}>
          <h4>Сотрудники организации</h4>
          <div className={s.flex}>
            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, employee: true }))}
            >
              Добавить сотрудника
            </Button>

            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, group: true }))}
            >
              Добавить группу
            </Button>
            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, passenger: true }))}
            >
              Добавить пассажира
            </Button>
            <Button variant="bgblue" icon={HiDocumentText}>
              Импортировать
            </Button>
          </div>
        </div>
        <EmployeesTable />
      </Container>
      <Container size="full">
        <div className={s.justi}>
          <h4>Каналы связей</h4>
          <div className={s.flex}>
            <Button
              variant="bgblue"
              icon={FaPlus}
              onClick={() => setModals((p) => ({ ...p, channel: true }))}
            >
              Добавить канал
            </Button>
          </div>
        </div>
        <CommunicationChannelsTable />
      </Container>
      <Servse />
      <Container size="full">
        <div className={s.justi}>
          <h4>Документы</h4>
          <div className={s.flex}>
            <Button variant="bgblue" icon={HiDocumentText}>
              Экспортировать PDF
            </Button>
          </div>
        </div>
        <LegalDocumentsTable />
      </Container>
      <Container size="full">
        <div className={s.justi}>
          <h4>Юр. документы организации</h4>
          <div className={s.flex}>
            <Button variant="bgblue" icon={HiDocumentText}>
              Экспортировать PDF
            </Button>
          </div>
        </div>
        <DocumentsTable />
      </Container>
      <Container size="full">
        <h4>История изменений</h4>
        <div className={s.infos}>
          <div className={s.info}>
            <p className={s.center}>
              {" "}
              <GoDotFill color="#2563EB" />
              Статус изменен на VIP
            </p>
            <span>Айгуль Мамбетова</span>
          </div>
          <span>15.10.2025 16:45</span>
        </div>
        <div className={s.infos}>
          <div className={s.info}>
            <p className={s.center}>
              {" "}
              <GoDotFill color="#22C55E" />
              Добавлен новый документ: Договор
            </p>
            <span>Айгуль Мамбетова</span>
          </div>
          <span>15.10.2025 16:45</span>
        </div>
        <div className={s.infos}>
          <div className={s.info}>
            <p className={s.center}>
              <GoDotFill color="#2563EB" />
              Обновлена контактная информация
            </p>
            <span>Айгуль Мамбетова</span>
          </div>
          <span>15.10.2025 16:45</span>
        </div>
      </Container>

      <AddCollectionModal
        isOpen={modals.collection}
        onClose={() => setModals((p) => ({ ...p, collection: false }))}
        onSubmit={(data) => console.log(data)}
      />
      <AddAccountModal
        isOpen={modals.account}
        onClose={() => setModals((p) => ({ ...p, account: false }))}
        onSubmit={(data) => console.log(data)}
      />
      <AddBranchModal
        isOpen={modals.branch}
        onClose={() => setModals((p) => ({ ...p, branch: false }))}
        onSubmit={(data) => console.log(data)}
      />
      <AddEmployeeModal
        isOpen={modals.employee}
        onClose={() => setModals((p) => ({ ...p, employee: false }))}
        onSubmit={(data) => console.log(data)}
      />
      <AddGroupModal
        isOpen={modals.group}
        onClose={() => setModals((p) => ({ ...p, group: false }))}
        onSubmit={(data) => console.log(data)}
      />
      <AddPassengerModal
        isOpen={modals.passenger}
        onClose={() => setModals((p) => ({ ...p, passenger: false }))}
        onSubmit={(data) => console.log(data)}
      />
      <AddChannelModal
        isOpen={modals.channel}
        onClose={() => setModals((p) => ({ ...p, channel: false }))}
        onSubmit={(data) => console.log(data)}
      />
    </div>
  );
}
