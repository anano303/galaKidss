"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import { Pencil, Check, X } from "lucide-react";
import "./chat-button.css";

const DEFAULT_MESSENGER_URL = "https://m.me/61574139157964";

export default function ChatButton() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: settings } = useQuery<{ messengerUrl?: string }>({
    queryKey: ["footer-settings"],
    queryFn: async () => {
      const res = await apiClient.get("/settings/footer");
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });

  const messengerUrl = settings?.messengerUrl || DEFAULT_MESSENGER_URL;

  const updateMutation = useMutation({
    mutationFn: async (data: { messengerUrl: string }) => {
      const res = await apiClient.put("/settings/footer", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["footer-settings"], data);
      setEditing(false);
    },
  });

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleChatClick = () => {
    if (!editing) {
      window.open(messengerUrl, "_blank");
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(messengerUrl);
    setEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (draft.trim()) {
      updateMutation.mutate({ messengerUrl: draft.trim() });
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter" && draft.trim()) {
      updateMutation.mutate({ messengerUrl: draft.trim() });
    }
    if (e.key === "Escape") {
      setEditing(false);
    }
  };

  return (
    <div className="chat-button-wrapper">
      {editing && (
        <div className="chat-edit-panel" onClick={(e) => e.stopPropagation()}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="მესენჯერის ლინკი..."
            className="chat-edit-input"
          />
          <button onClick={handleSave} className="chat-edit-btn save" title="შენახვა">
            <Check size={14} />
          </button>
          <button onClick={handleCancel} className="chat-edit-btn cancel" title="გაუქმება">
            <X size={14} />
          </button>
        </div>
      )}

      <div
        className="chat-button"
        onClick={handleChatClick}
        title="დაგვიკავშირდით მესენჯერში"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 28 28"
          fill="#ffffff"
        >
          <path d="M14,2.25C7.54,2.25,2.25,7.16,2.25,13.17c0,3.36,1.67,6.35,4.28,8.28V25.5l3.92-2.15c1.13,0.31,2.33,0.48,3.55,0.48c6.46,0,11.75-4.91,11.75-10.92S20.46,2.25,14,2.25z M15.34,17.5L12.5,14.5l-5.5,3l6-6.5l3,2.84l5.34-2.84L15.34,17.5z" />
        </svg>

        {isAdmin && !editing && (
          <button
            className="chat-edit-trigger"
            onClick={handleEditClick}
            title="მესენჯერის ლინკის რედაქტირება"
          >
            <Pencil size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
