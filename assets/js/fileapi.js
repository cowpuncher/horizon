//Скрипт на кастом добавления файла 
jQuery(document).ready(function ($) {
 
    if($('#addImages')) {
  
      var maxFileSize = 2 * 1024 * 1024; // (байт) Максимальный размер файла (2мб)
      var queue = {};
      var form = $('form#uploadImages');
      var imagesList = $('#uploadImagesList');
    
      var itemPreviewTemplate = imagesList.find('.item.template').clone();
      itemPreviewTemplate.removeClass('template');
      imagesList.find('.item.template').remove();
    
    
      $('#addImages').on('change', function () {
          var files = this.files;
    
          for (var i = 0; i < files.length; i++) {
              var file = files[i];
    
              if ( !file.type.match(/image\/(jpeg|jpg|png|gif)/) ) {
                  alert( 'Фотография должна быть в формате jpg, png или gif' );
                  continue;
              }
    
              if ( file.size > maxFileSize ) {
                  alert( 'Размер фотографии не должен превышать 2 Мб' );
                  continue;
              }
    
              preview(files[i]);
          }
    
          this.value = '';
      });
    
      // Создание превью
      function preview(file) {
          var reader = new FileReader();
          reader.addEventListener('load', function(event) {
              var img = document.createElement('img');
    
              var itemPreview = itemPreviewTemplate.clone();
    
              itemPreview.find('.img-wrap img').attr('src', event.target.result);
              itemPreview.data('id', file.name);
    
              imagesList.append(itemPreview);
    
              queue[file.name] = file;
    
          });
          reader.readAsDataURL(file);
      }
    
      // Удаление фотографий
      imagesList.on('click', '.delete-link', function () {
          var item = $(this).closest('.item'),
              id = item.data('id');
    
          delete queue[id];
    
          item.remove();
      });
    
    
      // Отправка формы
      form.on('submit', function(event) {
    
          var formData = new FormData(this);
    
          for (var id in queue) {
              formData.append('images[]', queue[id]);
          }
    
          $.ajax({
              url: $(this).attr('action'),
              type: 'POST',
              data: formData,
              async: true,
              success: function (res) {
                  alert(res)
              },
              cache: false,
              contentType: false,
              processData: false
          });
    
          return false;
      });
    }
  
  
  });