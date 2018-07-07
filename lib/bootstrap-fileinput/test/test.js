        function initFileInput(ctrlName, uploadUrl) {
            var control = $('#' + ctrlName);
            control.fileinput({
                language: 'zh', //设置语言  
                uploadUrl: uploadUrl,
                showUpload: true, //是否显示上传按钮  
                showRemove: true,
                showPreview: true,
                dropZoneEnabled: false,
                showCaption: true, //是否显示标题  
                allowedPreviewTypes: ['image'],
                allowedFileTypes: ['image'],
                allowedFileExtensions: ['jpg', 'png', 'gif'],
                maxFileSize: 2000,
                maxFileCount: 1,
                //initialPreview: [   
                //预览图片的设置  
                //      "<img src='http://127.0.0.1:8080/NewsManageSys/plugin/umeditor1_2_2/jsp/upload/20161030/55061                  477813913474.jpg' class='file-preview-image' alt='肖像图片' title='肖像图片'>",  
                //],  

            })
        }
        $(document).ready(function () {
            rootPath = ''
            var path = rootPath + "/lecturer/picture/upLoad.shtml";
            initFileInput("JSh_ZhP", path);
            $("#JSh_ZhP").on("fileuploaded", function (event, data, previewId, index) {
                $("#JSh_ZhP_Path").val(data.response);

            });

        });
