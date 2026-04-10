import { useAppStore } from '@/stores';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { publicZodiosHooks } from '@/libs';
import { IComponentProps } from '@/types';
import { MainPreviewType } from '@/types/PreviewType';



interface IProps extends IComponentProps {
  defaultMuted?: boolean;
  previewType?: MainPreviewType;
}

export default function MainTempate({ previewType, defaultMuted = true }: IProps) {
  //const { jwtObject} = useAppStore((s: any) => s);
  //const { jwtObject, onLogout, modalLoggedIn, formLayout, onOpenAlertMessage } = useAppStore((s: any) => s);
  const { query, push } = useRouter();

  console.log("previewType: ", previewType);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  // [API] Question Detail 조회
  const {
    isLoading: questionDetailLoading,
    data: questionDetailData,
    mutate: mutateQuestionDetailApiQuestionDetailQuestionIdGet,
    //mutate (useMutation): 서버에 변화를 주며, 일회성 작업이고 캐시 데이터를 업데이트하지 않아 별도의 쿼리 무효화(invalidate)가 필요합니다
    //서버 데이터 변경 (C, U, D)
  } = publicZodiosHooks.useQuestionDetailApiQuestionDetailQuestionIdGet(
    {
      params: { question_id: selectedQuestionId || 1 },
    },
    { enabled: selectedQuestionId !== null },
    {
      onSuccess: (e) => {
        console.log("배너 조회 성공:", e);
        //e?.body?.rows?.forEach(item => {console.log("aaa:", item)})
      },
      onError: (e) => {
        console.error("배너 조회 실패:", e);
      },
    },
  );



  // [API] Question List 조회
  const { 
    data: questionListData,
    isLoading: questionListLoading, 
    refetch: refetchQuestionList, 
    //refetch (useQuery): 기존 데이터를 다시 요청하여 캐시를 업데이트하며, 주로 목록을 새로고침하거나 수동으로 데이터를 갱신할 때 사용합니다
    //데이터 재요청 (R, 갱신)
    mutate: mutateQuestionListApiQuestionListGet,
  } = publicZodiosHooks.useQuestionListApiQuestionListGet({
    onSuccess: () => {
      console.log("testapi");
      //handleQuestionListSuccess(data);
    },
    onError: (error) => {
      console.error("❌ Question List 조회 실패:", error);
    },
  });

  

  // Question 상세 조회 함수
  const handleFetchQuestionDetail = useCallback((questionId: number) => {
    console.log(`📌 Question ID ${questionId} 상세 조회 시도...`);
    setSelectedQuestionId(questionId);
  }, []);

  useEffect(() => {
    if (questionDetailData) {      
    }
  }, [questionDetailData]);
  return (
    <div>      
      <p>메인화면입니다.</p>
      
      {/* API 재조회 버튼 */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={async () => {
            const result = await refetchQuestionList();
            console.log("refetch 결과:", result);
          }}
          style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
        >
          🔄 Question List 재조회
        </button>
        {selectedQuestionId && (
          <button 
            onClick={() => setSelectedQuestionId(null)}
            style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ✕ 상세보기 닫기
          </button>
        )}
      </div>

      {/* Question List 데이터 표시 */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>📋 Question List 데이터</h3>
        {questionListLoading ? (
          <p>⏳ 로딩 중...</p>
        ) : questionListData ? (
          <div>
            {Array.isArray(questionListData) ? (
              <div>
                <p><strong>총 질문 수: {questionListData.length}</strong></p>
                {questionListData.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#4caf50', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Subject</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>내용</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>작성일</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionListData.map((question: any, index: number) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{question.id}</td>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{question.subject}</td>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{question.content?.substring(0, 50)}...</td>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{question.create_date}</td>
                          <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button 
                              onClick={() => handleFetchQuestionDetail(question.id)}
                              style={{ 
                                padding: '6px 12px', 
                                backgroundColor: '#2196F3', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              상세보기
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>질문이 없습니다.</p>
                )}
              </div>
            ) : (
              <pre style={{ fontSize: '12px', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }}>
                {JSON.stringify(questionListData, null, 2)}
              </pre>
            )}
          </div>
        ) : (
          <p>❌ 데이터를 불러올 수 없습니다.</p>
        )}
      </div>

      {/* Question Detail 데이터 표시 */}
      {selectedQuestionId && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h3>🔍 Question Detail (ID: {selectedQuestionId})</h3>
          {questionDetailLoading ? (
            <p>⏳ 로딩 중...</p>
          ) : questionDetailData ? (
            <div>
              <div style={{ marginBottom: '15px' }}>
                <p><strong>ID:</strong> {questionDetailData.id}</p>
                <p><strong>Subject:</strong> {questionDetailData.subject}</p>
                <p><strong>Content:</strong></p>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {questionDetailData.content}
                </pre>
                <p><strong>Created Date:</strong> {questionDetailData.create_date}</p>
              </div>
              <pre style={{ fontSize: '11px', backgroundColor: '#fff', padding: '8px', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                {JSON.stringify(questionDetailData, null, 2)}
              </pre>
            </div>
          ) : (
            <p>❌ 데이터를 불러올 수 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
  
}
