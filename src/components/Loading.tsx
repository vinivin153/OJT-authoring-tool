import loading from 'assets/Images/loading.gif';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img src={loading} className="w-2/5" alt="로딩중.."></img>
      <span className="text-gray-600 text-3xl ml-2">로딩중...</span>
    </div>
  );
}

export default Loading;
