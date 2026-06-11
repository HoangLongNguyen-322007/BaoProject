import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleById, getCategoryName, getCategoryById, MOCK_ARTICLES, getTimeAgo } from '../../utils/mockData';
import { formatDate } from '../../utils/formatDate';
import styles from './ArticleDetailPage.module.css';

function ArticleDetailPage() {
   const { id } = useParams();
   const article = getArticleById(id);
   const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);
   const [copied, setCopied] = useState(false);

   // Comments Section States
   const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
   const [comments, setComments] = useState([
      {
         id: 1,
         author: 'Nguyễn Hoàng Nam',
         avatar: '',
         timeAgo: '2 giờ trước',
         content: 'Bài viết rất hay và cung cấp nhiều thông tin hữu ích về tình hình kinh tế hiện nay. Cảm ơn tác giả!',
         likes: 45,
         liked: false,
         replies: [
            {
               id: 11,
               author: 'Lan Anh',
               isAuthor: true,
               avatar: '',
               timeAgo: '1 giờ trước',
               content: 'Cảm ơn anh/chị đã quan tâm và theo dõi bài viết!',
               likes: 12,
               liked: false
            }
         ],
         showReplies: true
      },
      {
         id: 2,
         author: 'Trần Minh Quân',
         avatar: '',
         timeAgo: '3 giờ trước',
         content: 'Tăng trưởng tích cực nhưng vẫn còn nhiều thách thức phía trước. Hy vọng các chính sách mới sẽ phát huy hiệu quả.',
         likes: 28,
         liked: false,
         replies: []
      },
      {
         id: 3,
         author: 'Phạm Thu Hà',
         avatar: '',
         timeAgo: '5 giờ trước',
         content: 'Số liệu 6,42% là rất ấn tượng trong bối cảnh kinh tế toàn cầu còn nhiều biến động.',
         likes: 15,
         liked: false,
         replies: []
      }
   ]);
   const [newCommentText, setNewCommentText] = useState('');
   const [activeTab, setActiveTab] = useState('newest'); // 'newest' | 'popular'

   const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (!newCommentText.trim()) return;

      const newComment = {
         id: Date.now(),
         author: loggedInUser ? loggedInUser.name : 'Độc giả ẩn danh',
         avatar: loggedInUser && loggedInUser.avatar ? loggedInUser.avatar : '',
         timeAgo: 'Vừa xong',
         content: newCommentText.trim(),
         likes: 0,
         liked: false,
         replies: []
      };

      setComments([newComment, ...comments]);
      setNewCommentText('');
   };

   const handleLikeComment = (commentId, replyId = null) => {
      setComments(prevComments =>
         prevComments.map(c => {
            if (replyId) {
               if (c.id === commentId) {
                  return {
                     ...c,
                     replies: c.replies.map(r => {
                        if (r.id === replyId) {
                           return {
                              ...r,
                              likes: r.liked ? r.likes - 1 : r.likes + 1,
                              liked: !r.liked
                           };
                        }
                        return r;
                     })
                  };
               }
            } else {
               if (c.id === commentId) {
                  return {
                     ...c,
                     likes: c.liked ? c.likes - 1 : c.likes + 1,
                     liked: !c.liked
                  };
               }
            }
            return c;
         })
      );
   };

   const toggleReplies = (commentId) => {
      setComments(prevComments =>
         prevComments.map(c => {
            if (c.id === commentId) {
               return { ...c, showReplies: !c.showReplies };
            }
            return c;
         })
      );
   };

   // Scroll to top on article change
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   if (!article) {
      return (
         <div className={styles.notFound}>
            <h1>Không tìm thấy bài viết</h1>
            <p>Rất tiếc, chúng tôi không thể tìm thấy bài viết bạn đang yêu cầu.</p>
            <Link to="/" className={styles.link}>
               Quay lại Trang chủ
            </Link>
         </div>
      );
   }

   // Get related articles from same category (max 4)
   const relatedArticles = MOCK_ARTICLES.filter(
      (a) => a.category === article.category && a.id !== article.id
   ).slice(0, 4);

   // Get most read articles (top 5 from mock data)
   const mostReadArticles = MOCK_ARTICLES.slice(0, 5);

   // Default tags if article doesn't have custom ones
   const tags = article.tags || ['Kinh tế Việt Nam', 'GDP', 'Tăng trưởng', 'Chính sách', 'Doanh nghiệp'];

   const categoryInfo = getCategoryById(article.category) || { name: 'Tin tức', slug: 'news', color: '#D4AF37' };

   const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const decreaseFontSize = () => {
      if (fontSizeMultiplier > 0.8) {
         setFontSizeMultiplier(prev => Math.round((prev - 0.1) * 10) / 10);
      }
   };

   const increaseFontSize = () => {
      if (fontSizeMultiplier < 1.5) {
         setFontSizeMultiplier(prev => Math.round((prev + 0.1) * 10) / 10);
      }
   };

   const renderContent = () => {
      if (article.contentBlocks && article.contentBlocks.length > 0) {
         return article.contentBlocks.map((block, idx) => {
            if (block.type === 'heading') {
               return (
                  <h3 key={idx} className={styles.subheading}>
                     {block.text}
                  </h3>
               );
            }
            if (block.type === 'quote') {
               return (
                  <blockquote key={idx} className={styles.blockquote}>
                     <p className={styles.quoteText}>“{block.text}”</p>
                     {block.author && <span className={styles.quoteAuthor}>— {block.author}</span>}
                  </blockquote>
               );
            }
            return (
               <p key={idx} className={styles.paragraph}>
                  {block.text}
               </p>
            );
         });
      }

      // Fallback parser for plain text
      return article.content.split('\n\n').map((paragraph, idx) => {
         const trimmed = paragraph.trim();
         if (trimmed.startsWith('### ')) {
            return (
               <h3 key={idx} className={styles.subheading}>
                  {trimmed.replace('### ', '')}
               </h3>
            );
         }
         if (trimmed.startsWith('> ')) {
            const quoteContent = trimmed.replace('> ', '');
            const parts = quoteContent.split(' — ');
            return (
               <blockquote key={idx} className={styles.blockquote}>
                  <p className={styles.quoteText}>“{parts[0]}”</p>
                  {parts[1] && <span className={styles.quoteAuthor}>— {parts[1]}</span>}
               </blockquote>
            );
         }
         return (
            <p key={idx} className={styles.paragraph}>
               {trimmed}
            </p>
         );
      });
   };

   return (
      <div className={styles.articlePage}>
         {/* Toast Notification for copying link */}
         {copied && <div className={styles.toast}>Đã sao chép liên kết thành công!</div>}

         <div className={styles.container}>
            {/* Breadcrumb Navigation */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
               <Link to="/">Trang chủ</Link>
               <span className={styles.breadcrumbSeparator}>›</span>
               <Link to={`/category/${categoryInfo.slug}`}>{categoryInfo.name}</Link>
               {article.subCategory && (
                  <>
                     <span className={styles.breadcrumbSeparator}>›</span>
                     <span className={styles.breadcrumbCurrent}>{article.subCategory}</span>
                  </>
               )}
            </nav>

            <div className={styles.pageLayout}>
               {/* MAIN COLUMN (LEFT) */}
               <article className={styles.mainColumn}>
                  {/* Category Badge */}
                  <div className={styles.badgeWrapper}>
                     <Link
                        to={`/category/${categoryInfo.slug}`}
                        className={styles.categoryBadge}
                        style={{ '--category-color': categoryInfo.color }}
                     >
                        {categoryInfo.name.toUpperCase()}
                     </Link>
                  </div>

                  {/* Title */}
                  <h1 className={styles.title}>{article.title}</h1>

                  {/* Metadata & Author Details */}
                  <div className={styles.metaRow}>
                     <div className={styles.authorMeta}>
                        <svg className={styles.metaIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                           <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className={styles.authorName}>{article.author}</span>
                     </div>
                     <div className={styles.dateMeta}>
                        <svg className={styles.metaIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <circle cx="12" cy="12" r="10" />
                           <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <time dateTime={article.date.toISOString()}>
                           {article.date.toLocaleDateString('vi-VN')} {article.date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </time>
                     </div>
                     <div className={styles.readMeta}>
                        <svg className={styles.metaIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                           <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        <span>{article.readTime} phút đọc</span>
                     </div>
                  </div>

                  {/* Sapo (Excerpt) */}
                  {article.excerpt && (
                     <div className={styles.sapo}>
                        {article.excerpt}
                     </div>
                  )}

                  {/* Toolbar: Font Sizing & Share Actions */}
                  <div className={styles.toolbar}>
                     <div className={styles.shareActions}>
                        <span className={styles.toolbarLabel}>Chia sẻ:</span>
                        <button className={`${styles.toolBtn} ${styles.shareFb}`} aria-label="Chia sẻ Facebook">
                           <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                           </svg>
                        </button>
                        <button className={`${styles.toolBtn} ${styles.shareMessenger}`} aria-label="Chia sẻ Messenger">
                           <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.253a12.923 12.923 0 003.443.464c6.627 0 12-4.974 12-11.111C24 4.973 18.627 0 12 0zm1.293 14.193l-3.093-3.3-6.025 3.3 6.625-7.031 3.163 3.3 5.955-3.3-6.625 7.031z" />
                           </svg>
                        </button>
                        <button className={`${styles.toolBtn} ${styles.shareTwitter}`} aria-label="Chia sẻ Twitter">
                           <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                           </svg>
                        </button>
                        <button className={`${styles.toolBtn} ${styles.shareCopy}`} onClick={handleCopyLink} aria-label="Copy liên kết bài viết">
                           <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                           </svg>
                        </button>
                     </div>

                     <div className={styles.textAdjust}>
                        <span className={styles.aaLabel}>Aa</span>
                        <button className={styles.adjustBtn} onClick={decreaseFontSize} disabled={fontSizeMultiplier <= 0.8} aria-label="Giảm cỡ chữ">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <line x1="5" y1="12" x2="19" y2="12" />
                           </svg>
                        </button>
                        <span className={styles.fontSizePercent}>{Math.round(fontSizeMultiplier * 100)}%</span>
                        <button className={styles.adjustBtn} onClick={increaseFontSize} disabled={fontSizeMultiplier >= 1.5} aria-label="Tăng cỡ chữ">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                           </svg>
                        </button>
                        <div className={styles.toolbarDivider}></div>
                        <button className={styles.toolBtn} onClick={() => window.print()} aria-label="In bài viết">
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="6 9 6 2 18 2 18 9" />
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                              <rect x="6" y="14" width="12" height="8" />
                           </svg>
                        </button>
                     </div>
                  </div>

                  {/* Hero Image */}
                  <div className={styles.heroWrapper}>
                     <img src={article.image} alt={article.title} className={styles.heroImage} />
                     {article.caption && <div className={styles.heroCaption}>{article.caption}</div>}
                  </div>

                  {/* Article content (Adjustable text size) */}
                  <div 
                     className={styles.articleContent} 
                     style={{ fontSize: `${fontSizeMultiplier * 1.05}rem` }}
                  >
                     {renderContent()}
                  </div>

                  {/* ========== COMMENT SECTION ========== */}
                  <section className={styles.commentsSection} id="comments-section">
                     <div className={styles.commentsHead}>
                        <svg className={styles.commentIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <h3 className={styles.commentsTitle}>BÌNH LUẬN ({comments.length + 125})</h3>
                     </div>

                     {/* Comment Input Box */}
                     <div className={styles.commentInputBox}>
                        <div className={styles.commentAvatar}>
                           {loggedInUser ? (
                              <div className={styles.avatarEmpty}>
                                 {loggedInUser.name ? loggedInUser.name.charAt(0) : 'U'}
                              </div>
                           ) : (
                              <div className={styles.avatarEmpty}>?</div>
                           )}
                        </div>
                        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                           <textarea
                              className={styles.commentTextarea}
                              placeholder="Viết bình luận của bạn..."
                              value={newCommentText}
                              onChange={(e) => setNewCommentText(e.target.value.slice(0, 1000))}
                              maxLength={1000}
                           />
                           <div className={styles.commentFormBottom}>
                              <div className={styles.commentFormTools}>
                                 <button type="button" className={styles.toolIconBtn} aria-label="Thêm emoji">
                                    😊
                                 </button>
                                 <button type="button" className={styles.toolIconBtn} aria-label="Đính kèm ảnh">
                                    📷
                                 </button>
                              </div>
                              <div className={styles.commentFormSubmitRow}>
                                 <span className={styles.charCounter}>{newCommentText.length}/1000</span>
                                 <button
                                    type="submit"
                                    className={styles.btnSubmitComment}
                                    disabled={!newCommentText.trim()}
                                 >
                                    Gửi bình luận
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>

                     {/* Tabs Header */}
                     <div className={styles.commentTabs}>
                        <button
                           className={`${styles.tabBtn} ${activeTab === 'newest' ? styles.tabBtnActive : ''}`}
                           onClick={() => setActiveTab('newest')}
                        >
                           MỚI NHẤT
                        </button>
                        <button
                           className={`${styles.tabBtn} ${activeTab === 'popular' ? styles.tabBtnActive : ''}`}
                           onClick={() => setActiveTab('popular')}
                        >
                           ĐƯỢC QUAN TÂM NHẤT
                        </button>
                     </div>

                     {/* Comments List */}
                     <div className={styles.commentsList}>
                        {comments.map((comment) => (
                           <div key={comment.id} className={styles.commentItem}>
                              <div className={styles.commentMain}>
                                 <div className={styles.commentHeader}>
                                    <div className={styles.commentUserAvatar}>
                                       {comment.avatar ? (
                                          <img src={comment.avatar} alt={comment.author} className={styles.avatarImg} />
                                       ) : (
                                          <div className={styles.avatarEmpty}>{comment.author.charAt(0)}</div>
                                       )}
                                    </div>
                                    <div className={styles.commentMeta}>
                                       <span className={styles.commentAuthorName}>{comment.author}</span>
                                       <span className={styles.commentTime}>{comment.timeAgo}</span>
                                    </div>
                                    <button className={styles.commentOptionsBtn} aria-label="Tùy chọn bình luận">
                                       •••
                                    </button>
                                 </div>
                                 <p className={styles.commentTextContent}>{comment.content}</p>
                                 <div className={styles.commentActions}>
                                    <button
                                       className={`${styles.actionBtn} ${comment.liked ? styles.actionBtnLiked : ''}`}
                                       onClick={() => handleLikeComment(comment.id)}
                                    >
                                       <svg width="12" height="12" viewBox="0 0 24 24" fill={comment.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                       </svg>
                                       <span>{comment.likes}</span>
                                    </button>
                                    <button 
                                       className={styles.actionTextBtn}
                                       onClick={() => setNewCommentText(`@${comment.author} `)}
                                    >
                                       Trả lời
                                    </button>
                                    <button className={`${styles.actionTextBtn} ${styles.btnReportComment}`}>
                                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '3px', verticalAlign: 'middle'}}>
                                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                          <line x1="4" y1="22" x2="4" y2="15" />
                                       </svg>
                                       Báo cáo
                                    </button>
                                 </div>
                              </div>

                              {/* Nested Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                 <div className={styles.repliesList}>
                                    {comment.showReplies && comment.replies.map((reply) => (
                                       <div key={reply.id} className={styles.replyItem}>
                                          <div className={styles.commentHeader}>
                                             <div className={styles.commentUserAvatar}>
                                                {reply.avatar ? (
                                                   <img src={reply.avatar} alt={reply.author} className={styles.avatarImg} />
                                                ) : (
                                                   <div className={styles.avatarEmpty}>{reply.author.charAt(0)}</div>
                                                )}
                                             </div>
                                             <div className={styles.commentMeta}>
                                                <div className={styles.replyAuthorWrapper}>
                                                   <span className={styles.commentAuthorName}>{reply.author}</span>
                                                   {reply.isAuthor && <span className={styles.authorBadge}>Tác giả</span>}
                                                </div>
                                                <span className={styles.commentTime}>{reply.timeAgo}</span>
                                             </div>
                                          </div>
                                          <p className={styles.commentTextContent}>{reply.content}</p>
                                          <div className={styles.commentActions}>
                                             <button
                                                className={`${styles.actionBtn} ${reply.liked ? styles.actionBtnLiked : ''}`}
                                                onClick={() => handleLikeComment(comment.id, reply.id)}
                                             >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill={reply.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                                   <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                                </svg>
                                                <span>{reply.likes}</span>
                                             </button>
                                             <button 
                                                className={styles.actionTextBtn}
                                                onClick={() => setNewCommentText(`@${reply.author} `)}
                                             >
                                                Trả lời
                                             </button>
                                          </div>
                                       </div>
                                    ))}
                                    <button 
                                       className={styles.toggleRepliesBtn}
                                       onClick={() => toggleReplies(comment.id)}
                                    >
                                       {comment.showReplies ? 'Ẩn câu trả lời' : `Xem thêm ${comment.replies.length} câu trả lời`}
                                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '4px', transform: comment.showReplies ? 'rotate(180deg)' : 'rotate(0)'}}>
                                          <polyline points="6 9 12 15 18 9" />
                                       </svg>
                                    </button>
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>

                     {/* Load More Button */}
                     <button className={styles.btnLoadMoreComments}>
                        Xem thêm bình luận
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '6px'}}>
                           <polyline points="6 9 12 15 18 9" />
                        </svg>
                     </button>
                  </section>
               </article>

               {/* SIDEBAR (RIGHT) */}
               <aside className={styles.sidebar}>
                  {/* Tin liên quan */}
                  {relatedArticles.length > 0 && (
                     <div className={styles.sidebarBlock}>
                        <div className={styles.sidebarHead}>
                           <svg className={styles.goldIcon} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold-primary)">
                              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                           </svg>
                           <h3 className={styles.sidebarTitle}>TIN LIÊN QUAN</h3>
                        </div>
                        <div className={styles.relatedList}>
                           {relatedArticles.map((relArticle) => (
                              <Link key={relArticle.id} to={`/article/${relArticle.id}`} className={styles.relatedItem}>
                                 <div className={styles.relatedImgWrapper}>
                                    <img src={relArticle.image} alt={relArticle.title} className={styles.relatedImg} />
                                 </div>
                                 <div className={styles.relatedText}>
                                    <h4 className={styles.relatedTitleText}>{relArticle.title}</h4>
                                    <span className={styles.relatedTime}>
                                       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                          <circle cx="12" cy="12" r="10" />
                                          <polyline points="12 6 12 12 16 14" />
                                       </svg>
                                       {getTimeAgo(relArticle.date)}
                                    </span>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Chủ đề nổi bật */}
                  <div className={styles.sidebarBlock}>
                     <div className={styles.sidebarHead}>
                        <svg className={styles.goldIcon} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold-primary)">
                           <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                        </svg>
                        <h3 className={styles.sidebarTitle}>CHỦ ĐỀ NỔI BẬT</h3>
                     </div>
                     <div className={styles.tagCloud}>
                        {tags.map((tag, i) => (
                           <Link key={i} to={`/search?q=${encodeURIComponent(tag)}`} className={styles.tagItem}>
                              # {tag}
                           </Link>
                        ))}
                     </div>
                  </div>

                  {/* Đọc nhiều */}
                  <div className={styles.sidebarBlock}>
                     <div className={styles.sidebarHead}>
                        <svg className={styles.goldIcon} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold-primary)">
                           <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                        </svg>
                        <h3 className={styles.sidebarTitle}>ĐỌC NHIỀU</h3>
                     </div>
                     <div className={styles.mostReadList}>
                        {mostReadArticles.map((mrArticle, index) => (
                           <Link key={mrArticle.id} to={`/article/${mrArticle.id}`} className={styles.mostReadItem}>
                              <span className={styles.rankNumber}>{index + 1}</span>
                              <div className={styles.mostReadText}>
                                 <h4 className={styles.mostReadTitleText}>{mrArticle.title}</h4>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </aside>
            </div>
         </div>
      </div>
   );
}

export default ArticleDetailPage;
