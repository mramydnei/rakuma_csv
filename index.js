csv_data = "取引完了日,取引内容,受け取り代金\n";
delay = "5000"

for (i = 0; i < document.getElementsByClassName("date-ym").length; i++) {
    document.getElementsByClassName("date-ym")[i].click();
}

setTimeout(`create_csv()`, delay);


function create_csv()

{
    for (i = 0; i < document.getElementsByClassName("detail-date").length; i++) {
        csv_data = csv_data + document.getElementsByClassName("detail-date")[i].innerText + ",";
        csv_data = csv_data + document.getElementsByClassName("detail-title")[i].innerText + ",";
        csv_data = csv_data + document.getElementsByClassName("detail-money")[i].innerText.replaceAll(',', '').replaceAll('¥', '') + "\n";
    }

    let newBtn = document.createElement('button');
newBtn.innerHTML = "CSVダウンロード";
newBtn.id = "download";
document.getElementsByClassName("list-tab")[0].appendChild(newBtn);


function downloadCSV() {
    //ダウンロードするCSVファイル名を指定する
    const filename = "download.csv";
    //CSVデータ
    const data = csv_data;
    //BOMを付与する（Excelでの文字化け対策）
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    //Blobでデータを作成する
    const blob = new Blob([bom, data], {
        type: "text/csv"
    });


    //IE10/11用(download属性が機能しないためmsSaveBlobを使用）
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);

        //その他ブラウザ
    } else {
        //BlobからオブジェクトURLを作成する
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        //ダウンロード用にリンクを作成する
        const download = document.createElement("a");
        //リンク先に上記で生成したURLを指定する
        download.href = url;
        //download属性にファイル名を指定する
        download.download = filename;
        //作成したリンクをクリックしてダウンロードを実行する
        download.click();
        //createObjectURLで作成したオブジェクトURLを開放する
        (window.URL || window.webkitURL).revokeObjectURL(url);
    }
}

//ボタンを取得する
const download = document.getElementById("download");
//ボタンがクリックされたら「downloadCSV」を実行する
download.addEventListener("click", downloadCSV, false);

}

