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

  // 화면
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* title */}
        <Text style={styles.title}>AI</Text>

        {/* 입력창 */}
        <Text style={styles.label}>코드 입력: </Text>
        <TextInput
          style={styles.input}
          placeholder="코드를 입력하세요..."
          multiline={true}
          value={diffCode}
          onChangeText={setDiffCode}
        />

        {/* 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleGenerate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "생각 중입니다..." : "커밋 메시지 생성"}
          </Text>
        </TouchableOpacity>

        {/* 결과창 */}
        {result ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>[ 결과 메시지 ]</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
    width: "100%",
    maxWidth: 700,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 30,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    backgroundColor: "white",
    height: 200,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#222",
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    cursor: "pointer",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});
