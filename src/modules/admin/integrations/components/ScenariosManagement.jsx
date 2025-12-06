"use client";
import React, { useState } from "react";
import { Button, Input, Select, Switch, Modal } from "@/ui";
import {
  MdEdit,
  MdDelete,
  MdSchedule,
  MdWarning,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import { scenarios } from "../hooks/Data";
import s from "../styles/ScenariosManagement.module.scss";

export default function ScenariosManagement() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [scenariosList, setScenariosList] = useState(scenarios);

  const handleEditScenario = (scenario) => {
    setSelectedScenario(scenario);
    setIsConfigModalOpen(true);
  };

  const handleSaveScenario = (config) => {
    setScenariosList((prev) =>
      prev.map((s) =>
        s.title === config.title ? { ...s, ...config } : s
      )
    );
    setIsConfigModalOpen(false);
    setSelectedScenario(null);
  };

  return (
    <div className={s.scenariosManagement}>
      <div className={s.scenariosList}>
        {scenariosList.map((scenario, idx) => (
          <div key={idx} className={s.scenarioCard}>
            <div className={s.scenarioHeader}>
              <div className={s.scenarioInfo}>
                <h4 className={s.scenarioTitle}>{scenario.title}</h4>
                <div className={s.scenarioStatus}>
                  <span
                    className={`${s.statusBadge} ${
                      s[`status-${scenario.statusColor}`]
                    }`}
                  >
                    {scenario.status}
                  </span>
                </div>
              </div>
              <div className={s.scenarioActions}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={MdEdit}
                  onClick={() => handleEditScenario(scenario)}
                >
                  Настроить
                </Button>
              </div>
            </div>

            <div className={s.scenarioDetails}>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Приоритет:</span>
                <span className={s.detailValue}>Высокий</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Расписание:</span>
                <span className={s.detailValue}>Каждый час</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Организации:</span>
                <span className={s.detailValue}>Все (3)</span>
              </div>
              <div className={s.detailRow}>
                <span className={s.detailLabel}>Ретраи:</span>
                <span className={s.detailValue}>3 попытки</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isConfigModalOpen && selectedScenario && (
        <ScenarioConfigModal
          scenario={selectedScenario}
          isOpen={isConfigModalOpen}
          onClose={() => {
            setIsConfigModalOpen(false);
            setSelectedScenario(null);
          }}
          onSave={handleSaveScenario}
        />
      )}
    </div>
  );
}

function ScenarioConfigModal({ scenario, isOpen, onClose, onSave }) {
  const [config, setConfig] = useState({
    enabled: scenario.status === "Работает",
    priority: "high",
    schedule: "hourly",
    organizations: [],
    documentTypes: [],
    retryCount: 3,
    retryDelay: 60,
    rateLimit: 100,
    currency: "all",
    errorHandling: "retry",
  });

  const handleSave = () => {
    onSave({
      ...scenario,
      ...config,
      status: config.enabled ? "Работает" : "Выключено",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="800px"
      title={`Настройка: ${scenario.title}`}
    >
      <div className={s.configModal}>
        <div className={s.configSection}>
          <h3 className={s.sectionTitle}>Основные настройки</h3>
          <div className={s.configField}>
            <label className={s.fieldLabel}>
              <Switch
                checked={config.enabled}
                onChange={(value) =>
                  setConfig((prev) => ({ ...prev, enabled: value }))
                }
              />
              <span>Включить сценарий</span>
            </label>
          </div>
          <div className={s.configField}>
            <label className={s.fieldLabel}>Приоритет</label>
            <Select
              value={config.priority}
              onChange={(value) =>
                setConfig((prev) => ({ ...prev, priority: value }))
              }
              options={[
                { value: "high", label: "Высокий" },
                { value: "medium", label: "Средний" },
                { value: "low", label: "Низкий" },
              ]}
            />
          </div>
          <div className={s.configField}>
            <label className={s.fieldLabel}>Расписание</label>
            <Select
              value={config.schedule}
              onChange={(value) =>
                setConfig((prev) => ({ ...prev, schedule: value }))
              }
              options={[
                { value: "realtime", label: "В реальном времени" },
                { value: "hourly", label: "Каждый час" },
                { value: "daily", label: "Ежедневно" },
                { value: "weekly", label: "Еженедельно" },
                { value: "custom", label: "Настраиваемое" },
              ]}
            />
          </div>
        </div>

        <div className={s.configSection}>
          <h3 className={s.sectionTitle}>Обработка ошибок</h3>
          <div className={s.configField}>
            <label className={s.fieldLabel}>Количество попыток</label>
            <Input
              type="number"
              value={config.retryCount}
              onChange={(value) =>
                setConfig((prev) => ({ ...prev, retryCount: parseInt(value) }))
              }
            />
          </div>
          <div className={s.configField}>
            <label className={s.fieldLabel}>Задержка между попытками (сек)</label>
            <Input
              type="number"
              value={config.retryDelay}
              onChange={(value) =>
                setConfig((prev) => ({ ...prev, retryDelay: parseInt(value) }))
              }
            />
          </div>
          <div className={s.configField}>
            <label className={s.fieldLabel}>Ограничение частоты (запросов/мин)</label>
            <Input
              type="number"
              value={config.rateLimit}
              onChange={(value) =>
                setConfig((prev) => ({ ...prev, rateLimit: parseInt(value) }))
              }
            />
          </div>
        </div>

        <div className={s.configSection}>
          <h3 className={s.sectionTitle}>Фильтры</h3>
          <div className={s.configField}>
            <label className={s.fieldLabel}>Валюта операций</label>
            <Select
              value={config.currency}
              onChange={(value) =>
                setConfig((prev) => ({ ...prev, currency: value }))
              }
              options={[
                { value: "all", label: "Все валюты" },
                { value: "KGS", label: "KGS" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
              ]}
            />
          </div>
        </div>

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

