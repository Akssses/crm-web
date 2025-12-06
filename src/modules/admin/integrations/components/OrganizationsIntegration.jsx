"use client";
import React, { useState } from "react";
import { Button, Input, Select, Switch, Modal } from "@/ui";
import { MdEdit, MdAdd, MdSettings, MdCheckCircle } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/OrganizationsIntegration.module.scss";

const MOCK_ORGANIZATIONS = [
  {
    id: "ORG-001",
    name: "Asia Travel",
    integrations: {
      "1С": { enabled: true, endpoint: "iq-1c.local:v1", token: "***" },
      Диадок: { enabled: true, endpoint: "api.diadoc.ru", token: "***" },
      Эльба: { enabled: true, endpoint: "api.elba.ru", token: "***" },
    },
    certificates: 3,
    scenarios: 8,
    lastSync: "2025-01-15 14:32",
  },
  {
    id: "ORG-002",
    name: "Техносервис",
    integrations: {
      "1С": { enabled: false, endpoint: "", token: "" },
      Диадок: { enabled: true, endpoint: "api.diadoc.ru", token: "***" },
      Эльба: { enabled: false, endpoint: "", token: "" },
    },
    certificates: 1,
    scenarios: 3,
    lastSync: "2025-01-15 13:45",
  },
];

export default function OrganizationsIntegration() {
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const handleEditOrg = (org) => {
    setSelectedOrg(org);
    setIsConfigModalOpen(true);
  };

  return (
    <div className={s.organizationsIntegration}>
      <div className={s.toolbar}>
        <Input
          icon={IoSearchOutline}
          placeholder="Поиск по организации..."
          value={search}
          onChange={setSearch}
          className={s.searchInput}
        />
        <Button variant="primary" icon={MdAdd}>
          Добавить организацию
        </Button>
      </div>

      <div className={s.organizationsList}>
        {MOCK_ORGANIZATIONS.filter(
          (org) =>
            !search ||
            org.name.toLowerCase().includes(search.toLowerCase())
        ).map((org) => (
          <div key={org.id} className={s.orgCard}>
            <div className={s.orgHeader}>
              <div className={s.orgInfo}>
                <h4 className={s.orgName}>{org.name}</h4>
                <div className={s.orgMeta}>
                  <span>Сертификатов: {org.certificates}</span>
                  <span>•</span>
                  <span>Сценариев: {org.scenarios}</span>
                  <span>•</span>
                  <span>Последняя синхронизация: {org.lastSync}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={MdEdit}
                onClick={() => handleEditOrg(org)}
              >
                Настроить
              </Button>
            </div>

            <div className={s.integrationsList}>
              {Object.entries(org.integrations).map(([service, config]) => (
                <div key={service} className={s.integrationItem}>
                  <div className={s.integrationInfo}>
                    <span className={s.integrationService}>{service}</span>
                    {config.enabled ? (
                      <>
                        <span className={s.integrationEndpoint}>
                          {config.endpoint}
                        </span>
                        <span className={s.integrationStatus}>
                          <MdCheckCircle size={16} />
                          Активен
                        </span>
                      </>
                    ) : (
                      <span className={s.integrationStatusDisabled}>
                        Выключено
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isConfigModalOpen && selectedOrg && (
        <OrganizationConfigModal
          organization={selectedOrg}
          isOpen={isConfigModalOpen}
          onClose={() => {
            setIsConfigModalOpen(false);
            setSelectedOrg(null);
          }}
        />
      )}
    </div>
  );
}

function OrganizationConfigModal({ organization, isOpen, onClose }) {
  const [config, setConfig] = useState(organization.integrations);

  const handleToggleIntegration = (service, enabled) => {
    setConfig((prev) => ({
      ...prev,
      [service]: { ...prev[service], enabled },
    }));
  };

  const handleSave = () => {
    console.log("Saving config for:", organization.name, config);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="900px"
      title={`Настройка интеграций: ${organization.name}`}
    >
      <div className={s.configModal}>
        {Object.entries(config).map(([service, serviceConfig]) => (
          <div key={service} className={s.configSection}>
            <div className={s.configHeader}>
              <h3 className={s.sectionTitle}>{service}</h3>
              <Switch
                checked={serviceConfig.enabled}
                onChange={(value) => handleToggleIntegration(service, value)}
              />
            </div>
            {serviceConfig.enabled && (
              <div className={s.configFields}>
                <div className={s.configField}>
                  <label className={s.fieldLabel}>Endpoint</label>
                  <Input
                    value={serviceConfig.endpoint}
                    onChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        [service]: { ...prev[service], endpoint: value },
                      }))
                    }
                  />
                </div>
                <div className={s.configField}>
                  <label className={s.fieldLabel}>Токен</label>
                  <Input
                    type="password"
                    value={serviceConfig.token}
                    onChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        [service]: { ...prev[service], token: value },
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

