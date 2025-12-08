import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [diffCode, setDiffCode] = useState(""); // 코드 저장
  const [result, setResult] = useState(""); // commit message 저장
  const [loading, setLoading] = useState(false); // ai가 생각 중인지 체크

  const handleGenerate = async () => {
    // 입력 확인
    if (!diffCode.trim()) {
      alert("코드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setResult(""); // 결과 초기화

    // 임시 서버
    setTimeout(() => {
      setResult("추후 추가");
      setLoading(false);
    }, 1500);
  };
}
