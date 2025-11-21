"use client";
import React from "react";
import { Container, Checkbox } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import s from "../styles/MyTasks.module.scss";

export default function MyTasks() {
  const tasks = [
    {
      id: 1,
      title: "New social media post",
      description: "Sed mi ac ac sagittis mi. I...",
      date: "Feb 12",
      category: "Marketing",
      categoryColor: "purple",
      completed: false,
    },
    {
      id: 2,
      title: "Upload new item to marketplace",
      description: "Sed mi ac ac sagittis mi. I...",
      date: "Feb 15",
      category: "eCommerce",
      categoryColor: "gray",
      completed: true,
    },
    {
      id: 3,
      title: "New social media post",
      description: "Sed mi ac ac sagittis mi. I...",
      date: "Feb 12",
      category: "Marketing",
      categoryColor: "purple",
      completed: false,
    },
    {
      id: 4,
      title: "Upload new item to marketplace",
      description: "Sed mi ac ac sagittis mi. I...",
      date: "Feb 15",
      category: "eCommerce",
      categoryColor: "gray",
      completed: true,
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Мои Задачи</h3>
      <div className={s.list}>
        {tasks.map((task) => (
          <div key={task.id} className={s.item}>
            <div className={s.checkboxWrapper}>
              <Checkbox checked={task.completed} id={`task-${task.id}`} />
            </div>
            <div className={s.content}>
              <p className={s.taskTitle}>{task.title}</p>
              <p className={s.description}>{task.description}</p>
              <div className={s.bottom}>
                <span className={s.date}>
                  <CiCalendar size={16} />
                  {task.date}
                </span>
                <span
                  className={`${s.category} ${
                    s[`category-${task.categoryColor}`]
                  }`}
                >
                  {task.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
