window.onload = loadNews;

//載入時間軸
function loadNews() {
    $("#visualization").empty();
    //載入時間軸
    var now = moment().minutes(0).seconds(0).milliseconds(0); //存放當前時間用於定位
    //alert(now);
    var newsClassName = []; //存放消息種類
    var newsClassCode = []; //存放消息種類的代碼，用於group的class
    var groupCount; //存放消息數量
    var itemCount; //存放所有消息的數量
    var colorGroup = ["#6C6C6C", "#4A4AFF", "#FF0000"]; //依重要程度的顏色選擇包
    //抓取消息種類
    $.ajax({
        url: "http://localhost:3000/web/getNewsClass",
        type: "GET",
        dataType: "json",
        success: function(newsClass) {
                if (newsClass) {
                    $.each(newsClass, function(i, item) {
                        newsClassName.push(newsClass[i].NEWS_CLASS_NAME);
                        newsClassCode.push(newsClass[i].NEWS_CLASS_CODE);
                    })
                }
                groupCount = newsClassName.length;

                // create a data set with groups
                var groups = new vis.DataSet();
                for (var g = 0; g < groupCount; g++) {
                    groups.add({
                        id: g,
                        content: newsClassName[g],
                        className: "group_" + newsClassCode[g]
                    });
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
                                var typeColor = colorGroup[timelineList[i].IMP_CLASS_CODE];

                                var contentHTML = '<p><strong>' + timelineList[i].TIMELINE_TITLE + '</strong>' +
                                    '<span style="color:' + typeColor + ';">【' + timelineList[i].IMP_CLASS_NAME + '】</span>' +
                                    '<br>開始時間：' + timelineList[i].START_DATE + ' ' + timelineList[i].START_TIME +
                                    '<br>地點：' + timelineList[i].TIMELINE_LOCATION;

                                items.add({
                                    id: timelineList[i].NEWS_CODE,
                                    group: group,
                                    content: contentHTML,
                                    start: start,
                                    type: 'box',
                                });
                            }

                            // create visualization
                            var container = document.getElementById('visualization');
                            var options = {
                                groupOrder: 'group',
                                showCurrentTime: true
                            };

                            var timeline = new vis.Timeline(container);

                            timeline.setOptions(options);
                            timeline.setGroups(groups);
                            timeline.setItems(items);

                            //設定時間軸停留在當前時間,無法
                            timeline.fit();

                            // 打開click功能
                            timeline.on('click', onClick);
                            timeline.on('doubleClick', onDoubleClick);

                            //do stuff...
                            function onClick(properties) {
                                //未解之謎，爲什麼會跑兩次？
                                if (!properties.item) {
                                    $("#newNewsTimeLineModal").modal('show');
                                    newTimeLine();
                                } else {
                                    var newsCode = properties.item;
                                    getSelectedNews(newsCode);
                                }
                            } //onClick(properties)

                            function onDoubleClick(properties) {
                                //未解之謎，爲什麼會跑兩次？
                                if (!properties.item) {
                                    $("#newNewsTimeLineModal").modal('show');
                                    newTimeLine();
                                } else {
                                    //不作任何動作
                                }
                            } //onClick(properties)


                        } //ajax.success(getTimelineList)
                }); //ajax(getTimelineList)
            } //ajax.success(getNewsClass)
    }); //ajax(getNewsClass)

    //獲取最新的消息
    $(".news-title").empty();
    $(".news-classPubTime").empty();
    $(".news-content").empty();

    $.ajax({
        url: "http://localhost:3000/web/getNewestNews/",
        type: "GET",
        dataType: "json",
        success: function(news) {
                if (news) {
                    $(".news-title").append("<h2><b>" + news[0].NEWS_TITLE + "</b></h2>");
                    $(".news-classPubTime").append("<h4><span style='color:#2828FF;'>" + news[0].NEWS_CLASS_NAME + "</span>，發佈時間：" + news[0].PUB_TIME + "</h4>");
                    $(".news-content").append(news[0].NEWS_CONTENT);
                    $("#newsPre").attr("data-preCurrent", news[0].START_DATE);
                    $("#newsPre").attr("data-preNewsCode", news[0].NEWS_CODE);
                    $("#newsNext").attr("data-nextCurrent", news[0].START_DATE);
                    $("#newsNext").attr("data-nextNewsCode", news[0].NEWS_CODE);
                    $("#editNewsDetail").attr("data-newsDetail", news[0].NEWS_CODE);
                    $("#editTimeLineBtn").attr("data-newsTimeline", news[0].NEWS_CODE);

                }
            } //ajax.success(getNewestNews)
    }); //ajax(getNewestNews)
} //loadNews()

//獲取前一則消息
function goPreNews() {
    $("#newsNext").show();
    var currentDate = $("#newsPre").attr("data-preCurrent");
    var newsCode = $("#newsPre").attr("data-preNewsCode");
    $.ajax({
        url: "http://localhost:3000/web/getPreNews/" + currentDate + "/" + newsCode,
        type: "GET",
        dataType: "json",
        success: function(preNews) {
                if (preNews) {
                    $(".news-title").empty();
                    $(".news-classPubTime").empty();
                    $(".news-content").empty();

                    $(".news-title").append("<h2><b>" + preNews[0].NEWS_TITLE + "</b></h2>");
                    $(".news-classPubTime").append("<h4><span style='color:#2828FF;'>" + preNews[0].NEWS_CLASS_NAME + "</span>，發佈時間：" + preNews[0].PUB_TIME + "</h4>");
                    $(".news-content").append(preNews[0].NEWS_CONTENT);
                    $("#newsPre").attr("data-preCurrent", preNews[0].START_DATE);
                    $("#newsPre").attr("data-preNewsCode", preNews[0].NEWS_CODE);
                    $("#newsNext").attr("data-nextCurrent", preNews[0].START_DATE);
                    $("#newsNext").attr("data-nextNewsCode", preNews[0].NEWS_CODE);
                    $("#editNewsDetail").attr("data-newsDetail", preNews[0].NEWS_CODE);
                    $("#editTimeLineBtn").attr("data-newsTimeline", preNews[0].NEWS_CODE);

                    current = preNews[0].START_DATE;

                    isMinStartDate(current);
                }
            } //ajax.success(getPreNews)
    }); //ajax(getPreNews)
} //goPreNews()

//獲取後一則消息
function goNextNews() {
    $("#newsPre").show();
    var currentDate = $("#newsNext").attr("data-nextCurrent");
    var newsCode = $("#newsNext").attr("data-nextNewsCode");
    $.ajax({
        url: "http://localhost:3000/web/getNextNews/" + currentDate + "/" + newsCode,
        type: "GET",
        dataType: "json",
        success: function(nextNews) {
                if (nextNews) {
                    $(".news-title").empty();
                    $(".news-classPubTime").empty();
                    $(".news-content").empty();

                    $(".news-title").append("<h2><b>" + nextNews[0].NEWS_TITLE + "</b></h2>");
                    $(".news-classPubTime").append("<h4><span style='color:#2828FF;'>" + nextNews[0].NEWS_CLASS_NAME + "</span>，發佈時間：" + nextNews[0].PUB_TIME + "</h4>");
                    $(".news-content").append(nextNews[0].NEWS_CONTENT);
                    $("#newsPre").attr("data-preCurrent", nextNews[0].START_DATE);
                    $("#newsPre").attr("data-preNewsCode", nextNews[0].NEWS_CODE);
                    $("#newsNext").attr("data-nextCurrent", nextNews[0].START_DATE);
                    $("#newsNext").attr("data-nextNewsCode", nextNews[0].NEWS_CODE);
                    $("#editNewsDetail").attr("data-newsDetail", nextNews[0].NEWS_CODE);
                    $("#editTimeLineBtn").attr("data-newsTimeline", nextNews[0].NEWS_CODE);

                    var current = nextNews[0].START_DATE;

                    isMaxStartDate(current);
                }
            } //ajax.success(getPreNews)
    }); //ajax(getPreNews)
}

//判斷是否爲最小日期
function isMinStartDate(current) {
    $.ajax({
        url: "http://localhost:3000/web/isMinStartDate/" + current,
        type: "GET",
        dataType: "json",
        success: function(isMinStartDate) {
                if (isMinStartDate) {
                    if (isMinStartDate[0].result == 0) {
                        $("#newsPre").hide();
                    }
                }
            } //ajax.success(getMinStartDate)
    }); //ajax(getMinStartDate)
}

//判斷是否爲最大日期
function isMaxStartDate(current) {
    $.ajax({
        url: "http://localhost:3000/web/isMaxStartDate/" + current,
        type: "GET",
        dataType: "json",
        success: function(isMaxStartDate) {
                if (isMaxStartDate) {
                    if (isMaxStartDate[0].result == 0) {
                        $("#newsNext").hide();
                    }
                }
            } //ajax.success(getMaxNewsCode)
    }); //ajax(getMaxNewsCode)
}

//獲取選定的消息
function getSelectedNews(newsCode) {
    $.ajax({
        url: "http://localhost:3000/web/getSelectedNews/" + newsCode,
        type: "GET",
        dataType: "json",
        success: function(selectedNews) {
            if (selectedNews) {

                $(".news-title").empty();
                $(".news-classPubTime").empty();
                $(".news-content").empty();

                $(".news-title").append("<h2><b>" + selectedNews[0].NEWS_TITLE + "</b></h2>");
                $(".news-classPubTime").append("<h4><span style='color:#2828FF;'>" + selectedNews[0].NEWS_CLASS_NAME + "</span>，發佈時間：" + selectedNews[0].PUB_TIME + "</h4>");
                $(".news-content").append(selectedNews[0].NEWS_CONTENT);

                $("#newsPre").attr("data-preCurrent", selectedNews[0].START_DATE);
                $("#newsPre").attr("data-preNewsCode", selectedNews[0].NEWS_CODE);
                $("#newsNext").attr("data-nextCurrent", selectedNews[0].START_DATE);
                $("#newsNext").attr("data-nextNewsCode", selectedNews[0].NEWS_CODE);
                $("#editNewsDetail").attr("data-newsDetail", selectedNews[0].NEWS_CODE);
                $("#editTimeLineBtn").attr("data-newstimeline", selectedNews[0].NEWS_CODE);


                $("#newsPre").show();
                $("#newsNext").show();

                var current = selectedNews[0].START_DATE;

                isMaxStartDate(current);
                isMinStartDate(current);
            }
        }
    }); //ajax(getSelectedNews)
}





//modal部分

//點擊編輯按鈕獲取詳細資料
$("#editNewsDetail").click(function() {
    var id = $(this).attr("data-newsDetail");
    var result = new Array();
    //清空原先modal的內容
    $("#newsTitle").val("");
    $("#newsTitle").attr("name", "NEWS_TITLE");
    $("#newsContent").val("");
    $("#newsContent").attr("name", "NEWS_CONTENT");
    $("#newsCode").val("");
    $("#newsCode").attr("name", "NEWS_CODE");
    //抓取newstudent_news
    $.ajax({
        url: "http://localhost:3000/admin/getNews/" + id,
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                result = data;
                $("#newsTitle").val(result[0].NEWS_TITLE);
                CKEDITOR.instances.newsContent.setData(result[0].NEWS_CONTENT);
                $("#newsCode").val(result[0].NEWS_CODE);
            }
        }
    })
})

//提交編輯消息的內容
$("#submitEditDetail").click(function() {
    var newsTitle = $("#newsTitle").val();
    var newsCode = $("#newsCode").val();
    var newsContent = CKEDITOR.instances.newsContent.getData();


    $.ajax({
        url: "http://localhost:3000/admin/updateNews",
        type: "POST",
        data: {
            NEWS_CODE: newsCode,
            NEWS_TITLE: newsTitle,
            NEWS_CONTENT: newsContent
        },
        success: function() {
            $(".news-title").empty();
            $(".news-content").empty();

            $(".news-title").append("<h2><b>" + newsTitle + "</b></h2>");
            $(".news-content").append(newsContent);

            $("#editDetail").fadeOut();
        }
    });
})

//刪除消息step1
$("#deleteNews").click(function() {
    var id = $(this).attr("data-deleteNews");
    $("#deleteConfirm").attr("data-deleteConfirm", id);
})

//刪除消息step2
$("#deleteConfirm").click(function() {
    var id = $(this).attr("data-deleteConfirm");

    $.ajax({
        url: "http://localhost:3000/admin/deleteNews",
        type: "POST",
        data: {
            NEWS_CODE: id
        },
        success: function() {
            location.reload();
        }
    });
})

//修改現有的timeline
$("#editTimeLineBtn").click(function() {
    var newsCode = $(this).attr("data-newsTimeline");
    var result = new Array(); //存放時間軸信息
    var category = new Array(); //存放類別
    var importance = new Array(); //存放重要程度
    //清空原先modal的內容
    $("#newsTimeLineCode").val("");
    $("#newsTimeLineCode").attr("name", "NEWS_CODE");
    $("#newsTimeLineTitle").val("");
    $("#newsTimeLineTitle").attr("name", "TIMELINE_TITLE");
    $("#newsStartDate").val("");
    $("#newsStartDate").attr("name", "START_DATE");
    $("#newsStartTime").val("");
    $("#newsStartTime").attr("name", "START_TIME");
    $("#newsLocation").val("");
    $("#newsLocation").attr("name", "TIMELINE_LOCATION");
    $("#newsClass").empty();
    $("#newsClass").attr("name", "NEWS_CLASS_CODE");
    $("#newsImpClass").empty();
    $("#newsImpClass").attr("name", "IMP_CLASS_CODE");

    //抓取newstudent_timeLine
    $.ajax({
        url: "http://localhost:3000/admin/getNewsTimeLine/" + newsCode,
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                result = data;
                $("#newsTimeLineCode").val(result[0].NEWS_CODE);
                $("#newsTimeLineTitle").val(result[0].TIMELINE_TITLE);
                $("#newsStartDate").val(result[0].START_DATE);
                $("#newsStartTime").val(result[0].START_TIME);
                $("#newsLocation").val(result[0].TIMELINE_LOCATION);
                $("#deleteNews").attr("data-deleteNews", result[0].NEWS_CODE);
            }
        }
    });

    //抓取newstudent_news_class
    $.ajax({
        url: "http://localhost:3000/admin/getNewsClass",
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                category = data;
                $.each(category, function(i, item) {
                    $("#newsClass").append("<option value='" + category[i].NEWS_CLASS_CODE + "'>" + category[i].NEWS_CLASS_NAME + "</option>");
                })
                $("#newsClass").val(result[0].NEWS_CLASS_CODE);
            }
        }
    });

    //抓取newstudent_imp_class
    $.ajax({
        url: "http://localhost:3000/admin/getNewsImpClass",
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                importance = data;
                $.each(importance, function(i, item) {
                    $("#newsImpClass").append("<option value='" + importance[i].IMP_CLASS_CODE + "'>" + importance[i].IMP_CLASS_NAME + "</option>");
                })
                $("#newsImpClass").val(result[0].IMP_CLASS_CODE);
            }
        }
    });
})

//提交修改現有timeline
$("#editTimeLineConfirm").click(function() {
    var timelineCode = $("#newsTimeLineCode").val();
    var timelineTitle = $("#newsTimeLineTitle").val();
    var newsStartDate = $("#newsStartDate").val();
    var newsStartTime = $("#newsStartTime").val();
    var newsLocation = $("#newsLocation").val();
    var newsClass = $("#newsClass").val();
    var newsImpClass = $("#newsImpClass").val();

    $.ajax({
        url: "http://localhost:3000/admin/updateNewsTimeLine",
        type: "POST",
        data: {
            NEWS_CLASS_CODE: newsClass,
            IMP_CLASS_CODE: newsImpClass,
            NEWS_CODE: timelineCode,
            TIMELINE_TITLE: timelineTitle,
            TIMELINE_LOCATION: newsLocation,
            START_DATE: newsStartDate,
            START_TIME: newsStartTime
        },
        success: function() {
            location.reload();
        }
    });
})

//新增timeline
function newTimeLine() {
    var category = new Array(); //存放類別
    var importance = new Array(); //存放重要程度
    //清空原先modal的內容
    $("#newNewsTimeLineTitle").val("");
    $("#newNewsTimeLineTitle").attr("name", "NEW_TIMELINE_TITLE");
    $("#newNewsStartDate").val("");
    $("#newNewsStartDate").attr("name", "NEW_START_DATE");
    $("#newNewsStartTime").val("00:00");
    $("#newNewsStartTime").attr("name", "NEW_START_TIME");
    $("#newNewsLocation").val("");
    $("#newNewsLocation").attr("name", "NEW_TIMELINE_LOCATION");
    $("#newNewsClass").empty();
    $("#newNewsClass").attr("name", "NEW_NEWS_CLASS_CODE");
    $("#newNewsImpClass").empty();
    $("#newNewsImpClass").attr("name", "NEW_IMP_CLASS_CODE");

    //抓取newstudent_news_class
    $.ajax({
        url: "http://localhost:3000/admin/getNewsClass",
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                category = data;
                $.each(category, function(i, item) {
                    $("#newNewsClass").append("<option value='" + category[i].NEWS_CLASS_CODE + "'>" + category[i].NEWS_CLASS_NAME + "</option>");
                })
            }
        }
    })

    //抓取newstudent_imp_class
    $.ajax({
        url: "http://localhost:3000/admin/getNewsImpClass",
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                importance = data;
                $.each(importance, function(i, item) {
                    $("#newNewsImpClass").append("<option value='" + importance[i].IMP_CLASS_CODE + "'>" + importance[i].IMP_CLASS_NAME + "</option>");
                })
            }
        }
    })
}

//提交新增的timeline
$("#submitNewTimeline").click(function() {
    var newNewsTimeLineTitle = $("#newNewsTimeLineTitle").val();
    var newNewsClass = $("#newNewsClass").val();
    var newNewsImpClass = $("#newNewsImpClass").val();
    var newNewsStartDate = $("#newNewsStartDate").val();
    var newNewsStartTime = $("#newNewsStartTime").val();
    var newNewsLocation = $("#newNewsLocation").val();

    $.ajax({
        url: "http://localhost:3000/admin/newNewsTimeLine",
        type: "POST",
        data: {
            NEW_TIMELINE_TITLE: newNewsTimeLineTitle,
            NEW_NEWS_CLASS_CODE: newNewsClass,
            NEW_IMP_CLASS_CODE: newNewsImpClass,
            NEW_START_DATE: newNewsStartDate,
            NEW_START_TIME: newNewsStartTime,
            NEW_TIMELINE_LOCATION: newNewsLocation
        },
        success: function() {
            location.reload();
        }
    });
})
