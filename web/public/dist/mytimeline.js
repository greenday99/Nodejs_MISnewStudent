window.onload = loadTimeline;

function loadTimeline() {
    var now = moment().minutes(0).seconds(0).milliseconds(0); //存放當前時間用於定位
    //alert(now);
    var newsClassName = []; //存放消息種類
    var groupCount; //存放消息數量
    var itemCount; //存放所有消息的數量
    //抓取消息種類
    $.ajax({
        url: "http://localhost:3000/web/getNewsClass",
        type: "GET",
        dataType: "json",
        success: function(newsClass) {
                if (newsClass) {
                    $.each(newsClass, function(i, item) {
                        newsClassName.push(newsClass[i].NEWS_CLASS_NAME);
                    })
                }
                groupCount = newsClassName.length;

                // create a data set with groups
                var groups = new vis.DataSet();
                for (var g = 0; g < groupCount; g++) {
                    groups.add({ id: g, content: newsClassName[g] });
                }

                //抓取所有timeline消息
                $.ajax({
                    url: "http://localhost:3000/web/getTimelineList",
                    type: "GET",
                    dataType: "json",
                    success: function(timelineList) {
                            if (timelineList) {
                                itemCount = timelineList.length;
                            }

                            // create a dataset with items
                            var items = new vis.DataSet();
                            for (var i = 0; i < itemCount; i++) {
                                var start = new moment(timelineList[i].START_DATE + 'T' + timelineList[i].START_TIME);
                                //alert(start);
                                var groupName = timelineList[i].NEWS_CLASS_NAME;
                                var group;
                                for (var num = 0; num < groupCount; num++) {
                                    if (groupName == newsClassName[num]) {
                                        group = num;
                                        break;
                                    }
                                }
                                var typeColor;
                                if (timelineList[i].IMP_CLASS_NAME == '非常重要') {
                                    typeColor = 'red';
                                } else if (timelineList[i].IMP_CLASS_NAME == '重要') {
                                    typeColor = 'blue';
                                } else {
                                    typeColor = 'gray';
                                }

                                var contentHTML = '<strong>' + timelineList[i].TIMELINE_TITLE + '</strong>' +
                                    '<span style="color:' + typeColor + '">【' + timelineList[i].IMP_CLASS_NAME + '】</span>' +
                                    '<br>開始時間：' + timelineList[i].START_DATE + ' ' + timelineList[i].START_TIME +
                                    '<br>地點：' + timelineList[i].TIMELINE_LOCATION;

                                items.add({
                                    id: i,
                                    group: group,
                                    content: contentHTML,
                                    start: start,
                                    type: 'box'
                                });
                            }

                            // create visualization
                            var container = document.getElementById('visualization');
                            var options = {
                                groupOrder: 'group'
                            };

                            var timeline = new vis.Timeline(container);
                            timeline.setOptions(options);
                            timeline.setGroups(groups);
                            timeline.setItems(items);

                        } //ajax.success(getTimelineList)
                }); //ajax(getTimelineList)
            } //ajax.success(getNewsClass)
    }); //ajax(getNewsClass)
} //function()
