import React from "react";
import { formatDateBR, formatDateTimeBR } from "../utils/dateUtils";
import "./DateDisplay.css";

interface DateDisplayProps {
  date: string | Date;
  showTime?: boolean;
  className?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ date, showTime = false, className = "" }) => {
  const formatDate = (dateValue: string | Date) => {
    try {
      if (showTime) {
        return formatDateTimeBR(dateValue);
      }
      return formatDateBR(dateValue);
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  return (
    <span className={`date-display ${className}`} title={date.toString()}>
      {formatDate(date)}
    </span>
  );
};

interface TaskDatesProps {
  insertedAt: string;
  updatedAt: string;
  className?: string;
}

export const TaskDates: React.FC<TaskDatesProps> = ({ insertedAt, updatedAt, className = "" }) => {
  return (
    <div className={`task-dates ${className}`}>
      <div className="created-date">
        <small>
          <strong>Criado:</strong> <DateDisplay date={insertedAt} />
        </small>
      </div>
      {insertedAt !== updatedAt && (
        <div className="updated-date">
          <small>
            <strong>Atualizado:</strong> <DateDisplay date={updatedAt} />
          </small>
        </div>
      )}
    </div>
  );
};
