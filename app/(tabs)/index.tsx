import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// HomeScreen 함수 밖
interface HistoryRecord {
  id: number;
  code: string;
  result: string;
  timestamp: string;
}

export default function HomeScreen() {
  const [diffCode, setDiffCode] = useState(""); // 코드 저장
  const [loading, setLoading] = useState(false); // ai가 생각 중인지 체크

  // 히스토리 목록 (과거 기록 저장용)
  // 형식: { id: 1, code: "...", result: "..." }
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const handleGenerate = async () => {
    // 입력 확인
    if (!diffCode.trim()) {
      alert("코드를 입력해주세요.");
      return;
    }

    setLoading(true);
    //setResult(""); // 결과 초기화

    try {
      // 서버로 요청 보내기(http://localhost:8000/generate)
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 사용자가 입력한 코드 JSON으로 포장해서 보냄
        body: JSON.stringify({ diff: diffCode }),
      });

      const data = await response.json();
      const newResult = data.result || "AI 응답 실패";

      // 새로운 결과를 히스토리 맨 앞에 추가 (최신순)
      const newRecord = {
        id: Date.now(), // 고유 ID
        code: diffCode,
        result: newResult,
        timestamp: new Date().toLocaleTimeString(),
      };

      setHistory([newRecord, ...history]);
    } catch (error) {
      console.error(error);
      alert("서버 연결 실패. Docker를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 화면
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>AI Commit Generator</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Code Diff</Text>
          <TextInput
            style={styles.input}
            placeholder="코드를 붙여넣으세요..."
            multiline={true}
            textAlignVertical="top"
            value={diffCode}
            onChangeText={setDiffCode}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGenerate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "생성 중..." : "커밋 메시지 생성"}
          </Text>
        </TouchableOpacity>

        <View style={styles.resultArea}>
          <Text style={styles.subTitle}>History</Text>
          <ScrollView style={styles.historyList}>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>결과가 여기에 표시됩니다.</Text>
            ) : (
              history.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>{item.result}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    // ★ 핵심: SafeAreaView 대신 여기서 위쪽 여백을 줘서 노치를 피함
    paddingTop: 60,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20, // 좌우 여백
    paddingBottom: 20, // 아래 여백
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    flex: 4,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    fontFamily: "monospace",
    borderWidth: 1,
    borderColor: "#E1E4E8",
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultArea: {
    flex: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  historyList: {
    flex: 1,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E4E8",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
    textAlign: "right",
  },
  resultBox: {
    backgroundColor: "#F0F4F8",
    padding: 12,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});
