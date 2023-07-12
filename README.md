## ソースコードの構成 
- ./app.js : フィボナッチ数列のロジック部分
- ./server.js : サーバー部分
- ./\_\_ test \_\_/app.test.js : テストコード

## ソースコードの概要
 - フレームワークはExpressを使用した．
 - テストケースは以下の通り
    - ステータスコード : 400
        - nが0以下
        - nがint型ではない
    - ステータスコード : 200
        - 計算結果が2**53 - 1以上つまり，javascriptの言語仕様的に安全に計算できないやつ (結果とともにmessageを返却)
        - 計算結果がInfinityになるやつ (結果とともにmessageを返却)
        - あとは普通に結果を返却
 - エンドポイント
    - <https://fib-be35002ae28e.herokuapp.com/>
    - 意思疎通確認は以下のコマンドで
        - curl -X GET -H "Cotent-Type: application/json" "https://fib-be35002ae28e.herokuapp.com/fib?n=10"